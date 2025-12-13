### Implementation Plan: Dynamic "Popular Stories"

Currently, the "Popular Stories" list is just a reversed version of "New Releases." To make it truly dynamic, we need a way to measure popularity. The most straightforward metric is the number of times a story has been played.

1.  **Data Model Enhancement:**
    *   Each story document in both the `stories` and `sleepstories` collections in Firestore should have a new field: `playCount`, initialized to `0`.

2.  **Tracking Play Counts:**
    *   We need to increment the `playCount` for a story whenever a user plays it. This can be done in two ways:
        *   **Client-Side Increment:** When the `handlePress` function is called in `home.js`, `stories.js`, or `sleep.js`, we can issue an update call to Firestore to increment the `playCount` of the selected story. This is simple to implement but can be less secure and reliable if offline scenarios are a concern.
        *   **Backend Function (Recommended):** A more robust solution is to use a backend function (like a Firebase Cloud Function). The app would send an event to this function when a story is played, and the function would be responsible for securely incrementing the `playCount` in the database. This approach is more scalable and protects against fraudulent inflation of play counts.

3.  **Fetching Popular Stories:**
    *   In the `fetchStories` function within `home.js`, we will add a new set of queries to fetch the most popular stories.
    *   We will query both the `stories` and `sleepstories` collections, this time using `orderBy('playCount', 'desc')` to get the stories with the highest play counts first. We'll also use `limit(10)` to get the top 10 from each collection.
    *   Like with new releases, we will use `Promise.all` to run these queries concurrently.

4.  **Data Combination and State Update:**
    *   Once the top popular stories from both collections are fetched, we'll combine them into a single array.
    *   We will then sort this combined array again by `playCount` in descending order and take the top 10 overall to get the final list for the "Popular Stories" section.
    *   This final list will be used to update the `popularStories` state variable using `setPopularStories`.

5.  **UI Update:**
    *   The `FlatList` for "Popular Stories" is already connected to the `popularStories` state. It will automatically update once the state is populated with the fetched data.
    *   We can also use the same `loading` state to show an `<ActivityIndicator />` for the "Popular Stories" section while the data is being fetched.

By implementing this, the "Popular Stories" section will dynamically reflect which stories are most engaged with by users, providing a much more meaningful and interactive experience than the current placeholder logic.
