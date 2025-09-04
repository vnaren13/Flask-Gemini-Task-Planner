# Goal & Task Breaker Application

## Overview

The Goal & Task Breaker is a web application that leverages the power of the Gemini API to help users break down any goal, project, or to-do item into an organized, actionable checklist of subtasks, categorized into distinct phases. Whether you're a student planning a research paper, a project manager outlining milestones, or just someone looking to organize daily tasks, this tool aims to provide an intelligent, automated task breakdown.

Inspired by similar AI capabilities, this application demonstrates how large language models can be integrated into practical tools for productivity.

## Features

*   **Intelligent Task Breakdown:** Utilizes the Gemini API to generate logical phases and subtasks from a single goal input.
*   **Structured Output:** Presents the broken-down tasks in an organized, phased structure with checkboxes.
*   **Interactive Frontend:** A clean and responsive web interface built with HTML, CSS, and JavaScript.
*   **Loading Indicator:** Provides user feedback while the Gemini API is processing the request.

## Technologies Used

*   **Backend:** Flask (Python web framework)
*   **Frontend:** HTML, CSS, JavaScript
*   **AI Model:** Google Gemini API (`gemini-pro`)

## Setup and Running the Application

Follow these steps to get the Goal & Task Breaker running on your local machine:

### 1. Project Structure

Ensure your project directory is structured as follows:

```
your_project_directory/
├── app.py
├── .gitignore
├── output.json (will be created automatically)
├── static/
│   └── style.css
│   └── script.js
└── templates/
    └── index.html
```

### 2. Install Dependencies

Navigate to your project's root directory (`Assignment_code` in your case) in your terminal and install the required Python packages:

```bash
pip install Flask google-generative-ai
```

### 3. Obtain and Configure Gemini API Key

1.  Get your Gemini API key from [Google AI Studio](https://ai.google.dev/aistudio).
2.  **Set your API key as an environment variable.** This is crucial for security and prevents your key from being exposed in your code.

    *   **On Windows (Command Prompt - temporary):**
        ```cmd
        set GOOGLE_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
        ```
    *   **On Windows (PowerShell - temporary):**
        ```powershell
        $env:GOOGLE_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY"
        ```
    *   **For permanent setup on Windows:** Search for "Environment Variables" in the Start menu, go to "Advanced system settings" -> "Environment Variables...", and add `GOOGLE_API_KEY` as a new User variable with your key. Remember to restart your terminal/IDE after making permanent changes.

3.  Ensure the `app.py` is configured to read from the environment variable:
    ```python
    genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
    ```
    (This should already be in your `app.py` if you followed the previous instructions.)

### 4. Run the Flask Application

From your project's root directory (`Assignment_code`), run the Flask application:

```bash
python app.py
```

### 5. Access the Application

Open your web browser and navigate to:

```
http://127.0.0.1:5000/
```

## Edge Cases and Validation Handled

We have implemented several measures to ensure the application is robust and provides good user experience:

*   **Empty and Whitespace-Only Goals:** The backend (`app.py`) trims whitespace from the input and rejects goals that are empty after trimming, prompting the user to enter a valid goal.
*   **Extremely Long Goals:** A server-side character limit (currently 1000 characters) is enforced to prevent excessively long requests to the Gemini API, which could lead to performance issues or higher costs. The frontend also provides a `maxlength` attribute for immediate user feedback.
*   **Prompt Injection Attacks:** The Gemini prompt has been carefully crafted to explicitly instruct the model to interpret user input *only* as a "goal" and to ignore any embedded instructions or commands. This helps to mitigate the risk of a malicious user hijacking the model's behavior.
*   **Simple Goals:** While the application is designed for breaking down complex goals, it gracefully handles simple inputs. The Gemini API should still return a structured response (likely with fewer phases or tasks) for simple goals, and the frontend is designed to display this output without issues.
*   **API Response Parsing Errors:** The backend includes error handling for `json.JSONDecodeError` to catch cases where the Gemini API might return a malformed or unexpected non-JSON response, providing a user-friendly error message.
*   **General API Errors:** A general `Exception` handler is in place to catch other unforeseen issues during the API call or processing, providing a fallback error message to the user.

## Logging Gemini Responses

For debugging and inspection, the application logs the parsed JSON response from the Gemini API to a file named `output.json` in the project's root directory. This file is automatically ignored by Git (via `.gitignore`) to prevent it from being committed to your repository.
