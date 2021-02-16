// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }

const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner();
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError(error));
}

const errorTag = document.getElementById('error-message');
const lyricsDiv = document.getElementById('song-lyrics');

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    errorTag.innerText = " "
    lyricsDiv.innerText = " "
    document.getElementById("search-field").value = " "
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
            <img src="${song.artist.picture_medium}">
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    toggleSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
        toggleSpinner();
    }
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }

const displayLyrics = lyrics => {
    document.getElementById('song-container').innerText = " "
    lyricsDiv.innerText = lyrics;
    toggleSpinner();
}

const displayError = error => {
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    document.getElementById("loading-spinner").classList.toggle("d-none")
    document.getElementById("song-container").classList.toggle("d-none")
}
document.getElementById("search-field").addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }
});