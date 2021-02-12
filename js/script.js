const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-ul')
    songs.forEach(song => {
        const li = document.createElement("li");
        li.innerText = song.title;
        songContainer.appendChild(li)
    })
}