// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const searchHistory = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history-btn');

// Initialize search history from localStorage
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to update the display of search history
function updateSearchHistory() {
    searchHistory.innerHTML = ''; // Clear current history

    // Loop through history and create list items with delete buttons
    history.forEach((query, index) => {
        const li = document.createElement('li');
        li.classList.add('history-item');

        const queryText = document.createElement('span');
        queryText.textContent = query;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteHistoryItem(index));

        li.appendChild(queryText);
        li.appendChild(deleteButton);
        searchHistory.appendChild(li);
    });
}

// Perform search and store it in history
function performSearch() {
    const query = searchInput.value.trim();
    if (query === '') return;

    // Open Google search in new tab
    window.open(`https://www.google.com/search?q=${query}`, '_blank');

    // Save search term in history
    history.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(history));

    // Update history display
    updateSearchHistory();

    // Clear the search input
    searchInput.value = '';
}

// Delete individual search history item
function deleteHistoryItem(index) {
    // Remove the item from history array
    history.splice(index, 1);

    // Update localStorage
    localStorage.setItem('searchHistory', JSON.stringify(history));

    // Re-render search history
    updateSearchHistory();
}

// Clear all search history
function clearSearchHistory() {
    history = [];
    localStorage.removeItem('searchHistory');
    updateSearchHistory();
}

// Event Listeners
searchButton.addEventListener('click', performSearch);
clearHistoryButton.addEventListener('click', clearSearchHistory);

// Allow pressing Enter key to trigger the search
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Initial render of search history
updateSearchHistory();
