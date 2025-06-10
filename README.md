# NeptuneSeek - Service Finder

A Flask web application that helps users find and compare service providers using natural language queries and AI-powered search.

## Features

- **Natural Language Search**: Ask questions like "Who are the best dishwasher repair technicians in San Francisco?"
- **OpenAI Integration**: Uses GPT to understand and process user queries
- **Neptune Score**: Custom scoring system (50% rating, 30% reviews, 20% price clarity)
- **Clean UI**: Matches the provided React design with Tailwind CSS
- **Pagination**: Browse through results efficiently
- **Same-page Results**: Search and results on one page for smooth UX

## Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up OpenAI API key**:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```
   
   Or create a `.env` file:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open your browser** to `http://localhost:5000`

## Usage

1. Enter a natural language query like:
   - "Best plumbers in San Francisco with good reviews"
   - "Dishwasher repair services near me"
   - "Affordable house cleaning services"

2. The app will:
   - Process your query with OpenAI
   - Filter relevant service providers
   - Display results sorted by Neptune Score
   - Show ratings, pricing, and booking methods

## Neptune Score Calculation

- **50%** - Star rating (out of 5)
- **30%** - Number of reviews (logarithmic scale)
- **20%** - Price clarity and fairness

## File Structure

```
neptuneseek/
├── app.py              # Main Flask application
├── templates/
│   └── index.html      # Frontend template
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## API Endpoints

- `GET /` - Main application page
- `POST /search` - Search for service providers
  - Body: `query` (string), `page` (int, optional)
  - Returns: JSON with providers, pagination info

## Mock Data

The app includes 10 sample service providers covering:
- Plumbing
- Electrical work
- House cleaning
- Landscaping
- Roofing
- Handyman services
- Appliance repair

Each provider has realistic ratings, review counts, pricing, and booking methods.