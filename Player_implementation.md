### **Plan for Audio Integration in `PlayerScreen`**

This plan outlines the necessary steps to transform the static `PlayerScreen` into a fully functional audio player.

**Part 1: Installation and Setup**

First, two libraries would need to be installed.
1.  **`expo-audio`**: This is the core library for handling all audio playback functionality.
2.  **`@react-native-community/slider`**: The current slider in the UI is a non-functional placeholder. This library provides a real, interactive slider component that is needed to control the audio track position.

I would run the following command to install them:
`npx expo install expo-audio @react-native-community/slider`

**Part 2: Code Implementation in `player.js`**

The following changes would be made to the `app/player.js` file.

1.  **Import Dependencies:**
    *   Import the necessary hooks from `expo-audio`: `useAudioPlayer` and `useAudioPlayerStatus`.
    *   Import the functional `Slider` component from `@react-native-community/slider`.
    *   Import `useEffect` from `react` to handle side effects, like playing the audio when the screen loads.

2.  **Initialize the Player:**
    *   Inside the `PlayerScreen` component, initialize the audio player using the URL provided in the `item.audio` parameter.
        ```javascript
        const player = useAudioPlayer(item.audio);
        ```
    *   Get the live status of the player. This status object contains everything we need to update the UI, such as the current playback position, total duration, and whether the audio is currently playing.
        ```javascript
        const status = useAudioPlayerStatus(player);
        ```
    *   To automatically play the audio when the screen opens, a `useEffect` hook would be added.
        ```javascript
        useEffect(() => {
          player.play();
        }, []);
        ```

3.  **Implement Player Controls:**
    *   **Play/Pause Button:**
        *   Create a `handlePlayPause` function that checks `status.playing`. If true, it calls `player.pause()`; otherwise, it calls `player.play()`.
        *   This function would be attached to the `onPress` event of the main play/pause button.
        *   The icon inside the button would be changed dynamically from `'pause'` to `'play'` based on the `status.playing` boolean.
    *   **Forward/Rewind Buttons:**
        *   The "replay-10" button's `onPress` would be updated to call `player.seekTo(status.currentTime - 10)`.
        *   The "forward-30" button's `onPress` would be updated to call `player.seekTo(status.currentTime + 30)`.

4.  **Implement the Audio Slider:**
    *   The placeholder `<Slider />` component would be replaced with the imported `Slider` component.
    *   Its properties would be configured as follows:
        *   `value`: `status.currentTime`
        *   `maximumValue`: `status.duration`
        *   `onSlidingComplete`: This event would call `player.seekTo(value)` with the final value from the slider.

5.  **Update Time Display:**
    *   The hardcoded time values ("03:15" and "18:40") need to be replaced.
    *   A helper function would be created to format the `status.currentTime` and `status.duration` values (which are in seconds) into a display-friendly `MM:SS` format.
    *   The `Text` components for the time display would use this function to show the live playback time and the total duration.
