# Recently Played Implementation Plan

To implement a dynamic and persistent "Recently Played" section in the application, we will follow these steps:

1.  **Persistent Storage:**
    *   We will utilize `AsyncStorage` from `@react-native-async-storage/async-storage` to store the list of recently played stories directly on the user's device. This ensures that the data persists across application sessions.

2.  **Tracking User Activity:**
    *   The point of interaction where a user selects a story for playback is crucial. We will intercept this action within the `handlePress` (or similar naming like `handleStoryPress`) functions in the following files:
        *   `app/(tabs)/home.js`
        *   `app/(tabs)/stories.js`
        *   `app/(tabs)/sleep.js`
    *   Upon selection, the full story object will be captured.

3.  **Saving Logic for Recently Played Items:**
    *   A dedicated function (e.g., `addRecentlyPlayedItem`) will be created to manage the recently played list. This function will perform the following operations:
        *   **Retrieve:** It will asynchronously fetch the current list of recently played stories from `AsyncStorage` using a designated key (e.g., `'recentlyPlayedList'`).
        *   **Add New Item:** The newly selected story will be added to the beginning of the retrieved list.
        *   **Handle Duplicates:** To maintain a clean list, if the newly added story (identified by its unique `id`) already exists elsewhere in the list, its older entry will be removed before the new entry is prepended. This ensures the most recently played instance is at the top.
        *   **Limit Size:** The list will be capped at a predefined maximum number of items (e.g., 10 or 20) to prevent it from growing excessively. This involves removing the oldest items if the list exceeds the limit.
        *   **Persist:** The modified list will then be serialized (converted to a JSON string) and saved back into `AsyncStorage`.

4.  **Displaying on Home Screen (`app/(tabs)/home.js`):**
    *   **State Management:** A new state variable (e.g., `recentlyPlayedItems`) will be introduced in `home.js` to hold the list of stories to be displayed in the "Recently Played" section.
    *   **Initial Load:** An `useEffect` hook will be used to load the recently played list from `AsyncStorage` when the `home.js` component first mounts.
    *   **Dynamic Updates:** To ensure the "Recently Played" section is always up-to-date (e.g., if a user plays a story from another tab and then returns to the Home tab), we will utilize a focus listener (e.g., by using React Navigation's `useIsFocused` hook). This listener will trigger a reload of the recently played data from `AsyncStorage` whenever the Home screen comes into focus.
    *   **UI Integration:** The `FlatList` component currently displaying hardcoded `recentlyPlayed` data will be updated to use the `recentlyPlayedItems` state variable.

This comprehensive approach will result in a dynamic, persistent, and user-friendly "Recently Played" feature.