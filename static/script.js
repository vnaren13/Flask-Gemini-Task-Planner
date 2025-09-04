// Author: Gemini
// Date: 2024-07-30
// Description: JavaScript for handling form submission, loading indicator, and dynamic content update.
// Updated: Modified to handle JSON responses from the backend and dynamically build HTML.

document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goalForm');
    const goalTextarea = goalForm.querySelector('textarea[name="goal"]');
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');
    const resultsContainer = document.getElementById('results-container');

    // Author: Gemini
    // Date: 2024-07-30
    // Description: Ensures loading and error messages are hidden on initial load.
    loadingDiv.classList.add('hidden');
    errorMessageDiv.classList.add('hidden');


    goalForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        errorMessageDiv.classList.add('hidden'); // Hide any previous errors
        resultsContainer.innerHTML = ''; // Clear previous results
        loadingDiv.classList.remove('hidden'); // Show loading indicator

        const goal = goalTextarea.value;

        try {
            const response = await fetch('/break_down_goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `goal=${encodeURIComponent(goal)}`
            });

            const data = await response.json(); // Expect JSON response

            if (!response.ok) {
                // If response status is not OK (e.g., 400, 500), check for 'error' in JSON
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            // If no error, render the structured data
            renderStructuredData(data);

        } catch (error) {
            errorMessageDiv.textContent = `An error occurred: ${error.message}`;
            errorMessageDiv.classList.remove('hidden');
            console.error('Fetch error:', error);
        } finally {
            loadingDiv.classList.add('hidden'); // Hide loading indicator
        }
    });

    // Author: Gemini
    // Date: 2024-07-30
    // Description: Function to dynamically build HTML from structured JSON data.
    function renderStructuredData(structured_data) {
        if (!structured_data || !structured_data.phases || structured_data.phases.length === 0) {
            errorMessageDiv.textContent = "Could not break down your goal into phases. It might be too simple, or an unexpected format was returned.";
            errorMessageDiv.classList.remove('hidden');
            return;
        }

        let html = `<h2>Goal: "${structured_data.goal}"</h2>`;
        html += `<div class="phases-container">`;

        structured_data.phases.forEach((phase, phaseIndex) => {
            html += `<div class="phase">`;
            html += `<h3>${phase.name}</h3>`;
            html += `<ul class="task-list">`;
            phase.tasks.forEach((task, taskIndex) => {
                const uniqueId = `task-${phaseIndex + 1}-${taskIndex + 1}`;
                html += `<li>
                            <input type="checkbox" id="${uniqueId}" name="${uniqueId}">
                            <label for="${uniqueId}">${task}</label>
                        </li>`;
            });
            html += `</ul>`;
            html += `</div>`;
        });
        html += `</div>`;

        resultsContainer.innerHTML = html;
    }
});
