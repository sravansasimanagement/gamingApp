# Gaming App - React Native

## Objective
The objective of this project is to create a functional and visually appealing Android application using **React Native**. The app features a **game lobby** with popular games, a **favorite game toggle**, and a **game play screen** with a placeholder "Play" button.

## Features

### Home Screen:
- Display games in multiple sections:
  - **Most Popular Games**
  - **Most Played in Your Region**
  - **Players' Favorite Games**

- Each game includes:
  - Title
  - Description
  - Image
  - Favorite icon to toggle favorite status (saved in local storage)
  
- Navigation to the **Game Play Screen** when a game is selected.

### Game Play Screen:
- Display the selected game's details.
- Include a **Play** button that currently performs a placeholder action (e.g., displays a toast or message).

## Technical Requirements
- **State Management**: Implemented using **Redux** or **Context API**.
- **Local Storage**: Persist the list of favorite games using **AsyncStorage**.
- **UI Components**: Use **React Native Paper** or **NativeBase** for a clean, user-friendly interface.
- **Android APK**: Build and deliver the APK for testing and deployment.

## Installation

### Prerequisites
Ensure that the following are installed:
- **Node.js**: [Download here](https://nodejs.org/)
- **npm/yarn**: Node package managers
- **Android Studio**: For building the APK and testing on Android emulators.

### Steps to Set Up and Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. Install dependencies:
   ```bash
   npm install  # or yarn install
   
3. Run the project on an Android emulator or device:
   ```bash
   npm run android  # or yarn android
   
