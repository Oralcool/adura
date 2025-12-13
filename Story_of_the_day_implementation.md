### Implementation Plan: Dynamic "Story of the Day"

This plan will replace the current hardcoded "hero story" with a dynamic story fetched from a dedicated `daily_features` schedule in Firestore, ensuring the story changes at midnight in the user's local timezone.

1.  **Firestore Setup (Prerequisite):**
    *   Create a new collection in Firestore named `daily_features`.
    *   In this collection, create documents where each **Document ID** is a date in the format `YYYY-MM-DD`.
    *   Each document must contain two fields:
        *   `storyId` (string): The ID of the document to feature. This ID will correspond to a document ID in either the `stories` collection or the `sleepstories` collection.
        *   `storyCollection` (string): The name of the collection where the story lives (either `"stories"` or `"sleepstories"`).
    *   **(Optional but Recommended) `featuredDate` (Firestore Timestamp):** While the Document ID already contains the date information, having a dedicated `featuredDate` field can be beneficial for querying based on date ranges, easier sorting, and ensuring data integrity.
    *   *Example Document Structure (for `daily_features/2025-12-25`):*
        ```json
        // Document ID: "2025-12-25"
        {
          "storyId": "example-bible-story-id-789",
          "storyCollection": "stories",
          "featuredDate": "Timestamp(December 25, 2025 at 00:00:00 UTC)" // Firestore Timestamp
        }
        ```

2.  **State Management in `Home.js`:**
    *   Remove the static `story` object that is currently hardcoded in the `Home` component.
    *   Introduce a new state variable to hold the fetched story of the day: `const [storyOfTheDay, setStoryOfTheDay] = useState(null);`.
    *   The existing `loading` state will be used to manage the loading status for all initial data.

3.  **Consolidated Data Fetching Logic:**
    *   **Modify the main `useEffect` hook** in `home.js` to handle fetching both the "New Releases" and the "Story of the Day" in a single, unified process.
    *   This master `fetchInitialData` function will:
        a.  **Concurrently fetch** all initial data using `Promise.all`. This includes:
            *   The query for the top 10 new `stories`.
            *   The query for the top 10 new `sleepstories`.
            *   The query for the "Story of the Day" reference document from the `daily_features` collection (based on the user's local date).
        b.  **Process "New Releases":** Once the story lists are fetched, combine, sort, and update the `newReleases` state as already implemented.
        c.  **Process "Story of the Day":**
            *   Once the `daily_features` document is retrieved, perform a **second, dependent fetch** to get the actual story document from the correct collection (`stories` or `sleepstories`).
            *   Update the `storyOfTheDay` state with the result.
            *   Handle any errors gracefully (e.g., if no story is scheduled, `storyOfTheDay` can remain `null`).
        d.  **Update Loading State:** The `finally` block in this hook will set `setLoading(false)` only after *all* data fetching and state setting is complete.

4.  **UI and Data Loading Lifecycle:**
    *   In the JSX, update the "hero" section to be conditional.
        *   If `loading` is `true`, display a placeholder or an `ActivityIndicator` for the entire main content area.
        *   If `loading` is `false` and `storyOfTheDay` is not null, render the hero card using the data from the `storyOfTheDay` state.
        *   If `storyOfTheDay` is `null` (because nothing was scheduled), display a default, generic hero card so the UI doesn't look broken.

5.  **Refactor `handlePress`:**
    *   The `onPress` handler for the "Listen Now" button within the hero card should be updated to use the `storyOfTheDay` object from the state, ensuring that when the user clicks "Listen Now," the correct dynamic story is passed to the player.