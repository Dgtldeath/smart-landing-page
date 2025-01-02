# smart-landing-page
Repo for JS library for Smart Landing Page

The Smart Landing Page is an advanced A/B testing platform designed to dynamically and intelligently update the DOM layout and elements (such as copy, headlines, and images) in real time. Leveraging backend analytics and a smart metric algorithm built with PHP and a database, this solution optimizes user engagement through data-driven updates.

The system records user interactions, like clicking a Call-to-Action (CTA), and dynamically adjusts the probability of presenting "winning" content on subsequent page loads. The more successful a headline, image, or layout proves to be, the higher the likelihood of its reappearance in future AJAX responses. This approach allows for real-time marketing optimization as the campaign evolves.

Key Technical Features
Dynamic Content Updates:

On page load, the frontend sends an AJAX request to a PHP handler (handler.php) with the client's URL.
The backend retrieves the most statistically successful headline (H1) and CTA from the database and returns them in JSON format.
The JavaScript dynamically updates the DOM, replacing the content of the elements with the class names .smart-lp-h1 and .smart-lp-cta.
Real-Time A/B Testing:

Each headline (H1), CTA, and other elements are assigned unique IDs.
User interactions (e.g., clicks on CTAs) are logged with the associated IDs and stored in the database.
A scoring algorithm increases the likelihood of successful content reappearing.
Failover and Default Content:

If the AJAX request fails, a fallback mechanism provides randomized default content using JavaScript.
This ensures the user experience remains functional even in the event of server or network issues.
Interaction Logging:

When a CTA is clicked, the winning headline and CTA IDs are captured and sent to the backend via another AJAX request.
The backend logs this data to refine its algorithm and update content probabilities.
Content Management via Backend:

Headlines and CTAs are stored in a database and managed via PHP scripts.
This centralized storage allows for easy updates and integration with new campaigns.
