# 🎬 Movie Search Mobile App

A React Native application that allows users to search for movies, view details, and save favorites. It fetches movie data from the **OMDb API** and provides a smooth user experience.

## 🚀 Features

✅ Search movies by title using the **OMDb API**  
✅ Display movie posters, titles, and ratings in a list view  
✅ Tap on a movie to view detailed information (poster, title, year, genre, rating)  
✅ Save favorite movies using `AsyncStorage`  
✅ Load more movies when scrolling to the bottom  

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development  
- **React Navigation** - For seamless navigation  
- **AsyncStorage** - To store favorite movies locally  
- **Axios** - For API requests  
- **FlatList** - Efficient rendering of movie lists  

---

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/MovieSearchApp.git
cd MovieSearchApp
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure the API Key  

Open `api.js` and replace `"YOUR_API_KEY_HERE"` with your actual **OMDb API Key**.

```javascript
export const API_KEY = "YOUR_API_KEY_HERE";
export const BASE_URL = "https://www.omdbapi.com/";
```

### 4️⃣ Run the Application

For **Android**:
```sh
npx react-native run-android
```

For **iOS**:
```sh
npx react-native run-ios
```

---

## 📸 Screenshots

| Home Screen | Movie Details | Favorites |
|-------------|--------------|-----------|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Favorites](screenshots/favorites.png) |

---

## 📌 Folder Structure

```
MovieSearchApp/
│-- components/
│   ├── MovieCard.js        # Renders each movie item in the list
│   ├── SearchBar.js        # Custom search bar component
│-- screens/
│   ├── HomeScreen.js       # Displays search results
│   ├── DetailsScreen.js    # Shows detailed movie information
│   ├── FavoritesScreen.js  # Displays user’s favorite movies
│-- navigation.js           # Manages app navigation
│-- api.js                  # Stores API key and fetch logic
│-- App.tsx                 # Main entry point
│-- package.json            # Project dependencies
```

---

## 📌 API Integration

This app uses the **OMDb API** to fetch movie data. The API call is structured as follows:

### API Endpoint
```
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=MOVIE_TITLE
```

### Example Fetch Request (Using Axios)
```javascript
import axios from 'axios';
import { API_KEY, BASE_URL } from './api';

const fetchMovies = async (searchQuery) => {
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}`);
        return response.data.Search;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};
```

---

## 📌 Screens and Functionalities

### **1️⃣ Home Screen**
- Displays a search bar at the top.
- Lists movies with posters, titles, and ratings.
- Supports infinite scrolling.

### **2️⃣ Movie Details Screen**
- Shows movie poster, title, year, genre, and rating.
- Displays more detailed movie information.

### **3️⃣ Favorites Screen**
- Allows users to view and manage saved favorite movies.
- Uses `AsyncStorage` to persist data across app restarts.

### **4️⃣ Infinite Scroll (Load More)**
- Automatically loads more movies when the user reaches the bottom of the list.

---

## 📌 Future Improvements

✅ Implement a dark mode  
✅ Add user authentication for personalized favorites  
✅ Enhance UI with animations  

---

## 📌 Troubleshooting

### Common Issues & Fixes

1️⃣ **Metro Bundler Not Starting**  
   - Run `npx react-native start` before running the app.

2️⃣ **"Cannot find module" Error**  
   - Ensure all dependencies are installed with `npm install`.

3️⃣ **App Crashes on API Call**  
   - Ensure that `api.js` contains a valid **OMDb API key**.

---

## 📜 License

This project is **open-source** and available under the **MIT License**.

---

🚀 **Happy Coding! 🎥✨**
