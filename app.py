from flask import Flask, render_template, request, jsonify
import os
from openai import OpenAI
import math
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def calculate_neptune_score(rating, review_count, price_clarity):
    """
    Calculate Neptune Score based on:
    - Rating weight (50%)
    - Number of reviews (30%) 
    - Price fairness and clarity (20%)
    """
    # Rating score (out of 50)
    rating_score = (rating / 5) * 50
    
    # Review count score (out of 30)
    # Log scale to handle varying numbers of reviews
    # 0 reviews = 0, 10 reviews = 15, 100+ reviews = 30
    if review_count == 0:
        review_score = 0
    else:
        review_score = min(30, round(15 * math.log10(review_count + 1)))
    
    # Price clarity score (out of 20)
    price_score = (price_clarity / 100) * 20
    
    # Total Neptune Score
    neptune_score = round(rating_score + review_score + price_score)
    return max(0, min(100, neptune_score))

# Mock service provider data
MOCK_PROVIDERS = [
    {
        'id': '1',
        'name': 'Elite Plumbing Services',
        'rating': 4.8,
        'review_count': 203,
        'price': '$85/hour',
        'booking_method': 'Online booking',
        'price_clarity': 90,
        'service_type': 'plumbing'
    },
    {
        'id': '2',
        'name': 'Swift Electrical Solutions', 
        'rating': 4.7,
        'review_count': 156,
        'price': '$95/hour',
        'booking_method': 'Phone call',
        'price_clarity': 85,
        'service_type': 'electrical'
    },
    {
        'id': '3',
        'name': 'Sparkle Home Cleaning',
        'rating': 4.9,
        'review_count': 312,
        'price': '$75/visit',
        'booking_method': 'Online booking',
        'price_clarity': 95,
        'service_type': 'cleaning'
    },
    {
        'id': '4',
        'name': 'Green Gardens Landscaping',
        'rating': 4.5,
        'review_count': 89,
        'price': 'Contact for quote',
        'booking_method': 'Email or phone',
        'price_clarity': 60,
        'service_type': 'landscaping'
    },
    {
        'id': '5',
        'name': 'Reliable Roofing Co.',
        'rating': 4.6,
        'review_count': 124,
        'price': 'From $500',
        'booking_method': 'Phone consultation',
        'price_clarity': 70,
        'service_type': 'roofing'
    },
    {
        'id': '6',
        'name': 'Quick Fix Handyman',
        'rating': 4.3,
        'review_count': 67,
        'price': '$45/hour',
        'booking_method': 'Phone call',
        'price_clarity': 80,
        'service_type': 'handyman'
    },
    {
        'id': '7',
        'name': 'Pro Dishwasher Repair SF',
        'rating': 4.7,
        'review_count': 145,
        'price': '$120 service call + parts',
        'booking_method': 'Online booking',
        'price_clarity': 85,
        'service_type': 'appliance repair'
    },
    {
        'id': '8',
        'name': 'Bay Area Appliance Experts',
        'rating': 4.4,
        'review_count': 98,
        'price': '$100-150/hour',
        'booking_method': 'Phone call',
        'price_clarity': 75,
        'service_type': 'appliance repair'
    },
    {
        'id': '9',
        'name': 'Golden Gate Appliance Service',
        'rating': 4.8,
        'review_count': 189,
        'price': '$110 + parts',
        'booking_method': 'Online booking',
        'price_clarity': 90,
        'service_type': 'appliance repair'
    },
    {
        'id': '10',
        'name': 'SF Home Repair Specialists',
        'rating': 4.2,
        'review_count': 76,
        'price': '$80-120/hour',
        'booking_method': 'Phone or email',
        'price_clarity': 70,
        'service_type': 'appliance repair'
    }
]

# Add Neptune scores to all providers
for provider in MOCK_PROVIDERS:
    provider['neptune_score'] = calculate_neptune_score(
        provider['rating'], 
        provider['review_count'], 
        provider['price_clarity']
    )

def process_query_with_openai(query):
    """Process user query with OpenAI to extract service type and location"""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a service search assistant. Extract the service type and location from user queries. Return JSON with 'service_type' and 'location' fields. If no location is specified, use 'unspecified'."
                },
                {
                    "role": "user",
                    "content": f"Extract service type and location from: '{query}'"
                }
            ],
            max_tokens=100,
            temperature=0.1
        )
        
        result = json.loads(response.choices[0].message.content)
        return result.get('service_type', ''), result.get('location', '')
    except:
        # Fallback if OpenAI fails
        query_lower = query.lower()
        service_type = ''
        if any(word in query_lower for word in ['plumb', 'pipe', 'leak', 'drain']):
            service_type = 'plumbing'
        elif any(word in query_lower for word in ['electric', 'wire', 'outlet', 'power']):
            service_type = 'electrical'
        elif any(word in query_lower for word in ['clean', 'maid', 'house']):
            service_type = 'cleaning'
        elif any(word in query_lower for word in ['dishwasher', 'appliance', 'repair', 'fix']):
            service_type = 'appliance repair'
        elif any(word in query_lower for word in ['roof', 'shingle', 'gutter']):
            service_type = 'roofing'
        elif any(word in query_lower for word in ['garden', 'landscape', 'lawn']):
            service_type = 'landscaping'
        elif any(word in query_lower for word in ['handyman', 'fix', 'repair']):
            service_type = 'handyman'
            
        return service_type, 'unspecified'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query', '').strip()
    page = int(request.form.get('page', 1))
    per_page = 5
    
    if not query:
        return jsonify({'error': 'Query is required'}), 400
    
    # Process query with OpenAI
    service_type, location = process_query_with_openai(query)
    
    # Filter providers based on extracted service type
    filtered_providers = MOCK_PROVIDERS
    if service_type:
        filtered_providers = [p for p in MOCK_PROVIDERS if service_type.lower() in p['service_type'].lower()]
    
    # Sort by Neptune score (descending)
    filtered_providers.sort(key=lambda x: x['neptune_score'], reverse=True)
    
    # Pagination
    total_providers = len(filtered_providers)
    total_pages = math.ceil(total_providers / per_page)
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    paginated_providers = filtered_providers[start_idx:end_idx]
    
    return jsonify({
        'providers': paginated_providers,
        'current_page': page,
        'total_pages': total_pages,
        'total_results': total_providers,
        'service_type': service_type,
        'location': location
    })

if __name__ == '__main__':
    app.run(debug=True)