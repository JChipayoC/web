// Datos de ejemplo (en un proyecto real estos vendrían de una API)
let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audio-player');

// Cargar datos desde JSON
async function loadData() {
    try {
        const response = await fetch('canciones.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando los datos:', error);
    }
}

// Inicializar la aplicación
async function initApp() {
    const musicData = await loadData();
    
    if (musicData) {
        // Configurar reproductor
        setupPlayer(musicData.songs);
        
        // Mostrar géneros
        displayGenres(musicData.genres);
        
        // Mostrar artistas
        displayArtists(musicData.artists);
        
        // Mostrar playlists
        displayPlaylists(musicData.playlists);
        
        // Event listeners
        setupEventListeners();
    }
}

// Configurar reproductor
function setupPlayer(songs) {
    // Cargar primera canción
    loadSong(songs[currentSongIndex]);
    
    // Actualizar lista de reproducción en localStorage
    localStorage.setItem('playlist', JSON.stringify(songs));
}

function loadSong(song) {
    document.getElementById('titulo-cancion').textContent = song.title;
    document.getElementById('artista').textContent = song.artist;
    document.getElementById('portada').src = song.cover;
    document.getElementById('portada').alt = `${song.title} - ${song.artist}`;
    document.getElementById('duracion-total').textContent = formatTime(song.duration);
    
    audioPlayer.src = song.audio;
    audioPlayer.load();
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Mostrar géneros
function displayGenres(genres) {
    const container = document.getElementById('generos-container');
    
    genres.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <img src="${genre.image}" alt="${genre.name}">
            <div class="card-content">
                <h3>${genre.name}</h3>
                <p>${genre.songs} canciones</p>
            </div>
        `;
        container.appendChild(genreCard);
    });
}

// Mostrar artistas
function displayArtists(artists) {
    const container = document.getElementById('artistas-container');
    
    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <div class="card-content">
                <h3>${artist.name}</h3>
                <p>${artist.genre}</p>
            </div>
        `;
        container.appendChild(artistCard);
    });
}

// Mostrar playlists
function displayPlaylists(playlists) {
    const container = document.getElementById('playlists-container');
    
    playlists.forEach(playlist => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.innerHTML = `
            <img src="${playlist.image}" alt="${playlist.name}">
            <div class="card-content">
                <h3>${playlist.name}</h3>
                <p>${playlist.songs} canciones • ${playlist.creator}</p>
            </div>
        `;
        container.appendChild(playlistCard);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botones del reproductor
    document.getElementById('play-pause').addEventListener('click', togglePlay);
    document.getElementById('anterior').addEventListener('click', prevSong);
    document.getElementById('siguiente').addEventListener('click', nextSong);
    
    // Barra de progreso
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    document.getElementById('progress-bar').addEventListener('input', seek);
    
    // Botón explorar
    document.getElementById('explorarBtn').addEventListener('click', () => {
        document.getElementById('generos').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Cuando termina la canción
    audioPlayer.addEventListener('ended', nextSong);
}

function togglePlay() {
    const playPauseBtn = document.getElementById('play-pause');
    
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    isPlaying = !isPlaying;
}

function prevSong() {
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

function nextSong() {
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const currentTime = document.getElementById('tiempo-actual');
    
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
}

function seek() {
    const seekTime = (audioPlayer.duration / 100) * this.value;
    audioPlayer.currentTime = seekTime;
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);