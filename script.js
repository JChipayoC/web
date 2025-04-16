// Datos de la banda (podrían cargarse desde un JSON externo)
const bandData = {
    albums: [
        {
            id: 1,
            title: "Lo Que No Sabías",
            year: "2008",
            cover: "images/album1.jpg",
            songs: [
                { title: "Adicto Al Dolor", duration: "4:05", file: "music/lo que no sabias/Adicto Al Dolor.mp3" },
                { title: "Auto Rojo", duration: "3:31", file: "music/lo que no sabias/Auto Rojo.mp3" },
                { title: "Dime", duration: "3:22", file: "music/lo que no sabias/Dime.mp3" },
                { title: "Fallido Intento", duration: "3:40", file: "music/lo que no sabias/Fallido Intento.mp3" },
                { title: "Ha Vuelto a Suceder", duration: "2:56", file: "music/lo que no sabias/Ha Vuelto a Suceder.mp3" },
                { title: "No Es Suficiente", duration: "2:55", file: "music/lo que no sabias/No Es Suficiente.mp3" },
                { title: "No Estaba Acostumbrado", duration: "2:39", file: "music/lo que no sabias/No Estaba Acostumbrado.mp3" },
                { title: "Quisiera", duration: "3:30", file: "music/lo que no sabias/Quisiera.mp3" },
                { title: "Soledad", duration: "3:29", file: "music/lo que no sabias/Soledad.mp3" }

            ]
        },
        {
            id: 2,
            title: "Miénteme",
            year: "2010",
            cover: "images/album2.jpg",
            songs: [
                { title: "15 Minutos", duration: "3:03", file: "music/mienteme/15 Minutos.mp3" },
                { title: "En Un Dia Gris", duration: "3:40", file: "music/mienteme/En Un Dia Gris.mp3" },
                { title: "Mi Error", duration: "3:37", file: "music/mienteme/Mi Error.mp3" },
                { title: "Miénteme, Prométeme", duration: "3:49", file: "music/mienteme/mienteme prometeme.mp3" },
                { title: "Niñas Malas", duration: "3:13", file: "music/mienteme/Ninas malas.mp3" },
                { title: "No Digas Lo Siento", duration: "3:13", file: "music/mienteme/No digas lo siento.mp3" },
                { title: "Sigamos Caminando", duration: "3:36", file: "music/mienteme/Sigamos Caminando.mp3" },
                { title: "Volveré", duration: "3:15", file: "music/mienteme/Volvere.mp3" },
                { title: "Voy A Ser Quien Dañe tu Nombre", duration: "3:38", file: "music/mienteme/Voy A Ser Quien Dane tu Nombre.mp3" }
            ]
        },
        {
            id: 3,
            title: "Castillos de Arena",
            year: "2022",
            cover: "images/album3.jpg",
            songs: [
                { title: "Ahogándonos", duration: "3:41", file: "music/castillos de arena/Ahogandonos.mp3" },
                { title: "Duele no Tenerte", duration: "3:40", file: "music/castillos de arena/Duele no Tenerte.mp3" },
                { title: "Entre el Norte y el Sur", duration: "3:11", file: "music/castillos de arena/Entre el Norte y el Sur.mp3" },
                { title: "Fuego, Fuego", duration: "3:13", file: "music/castillos de arena/Fuego Fuego.mp3" },
                { title: "Nada que Hablar", duration: "3:28", file: "music/castillos de arena/Nada que Hablar.mp3" },
                { title: "Probe tu Veneno", duration: "4:14", file: "music/castillos de arena/Probe tu Veneno.mp3" },
                { title: "Punto Final", duration: "3:16", file: "music/castillos de arena/Punto Final.mp3" },
                { title: "Vamos a Perder", duration: "3:27", file: "music/castillos de arena/Vamos a Perder.mp3" }
            ]
        },
        {
            id: 4,
            title: "Barco de Papel",
            year: "2023",
            cover: "images/album4.jpg",
            songs: [
                { title: "Barco de Papel", duration: "3:32", file: "music/barco de papel/Barco de Papel.mp3" },
                { title: "En Otra Habitación", duration: "3:27", file: "music/barco de papel/En Otra Habitacion.mp3" },
                { title: "Morir Junto a Ti", duration: "3:39", file: "music/barco de papel/Morir Junto a Ti.mp3" },
                { title: "Salir Ileso", duration: "3:24", file: "music/barco de papel/Salir Ileso.mp3" },
                { title: "Te esperaré", duration: "3:00", file: "music/barco de papel/Te esperare.mp3" },
                { title: "Trágico y Romántico", duration: "3:58", file: "music/barco de papel/Tragico y Romantico.mp3" }
            ]
        }
    ],
    tourDates: [
        { date: "Sábado, 3 May 2025", venue: "Teatro Santande", location: "Bucaramanga, Colombia" },
        { date: "Jueves, 8 May 2025", venue: "laNau", location: "Barcelona, España" },
        { date: "Sábado, 10 May 2025", venue: "Sala Villanos", location: "Madrid, España" },
        { date: "Viernes, 23 May 2025", venue: "Foro Tims", location: "Monterrey, México" },
        { date: "Sábado, 24 May 2025", venue: "Foro La Paz", location: "Ciudad de México, México" }
    ]
};

// Variables del reproductor
let currentSongIndex = 0;
let currentAlbumIndex = 0;
let isPlaying = false;
const audio = new Audio();

// Elementos del DOM
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const currentSongDisplay = document.getElementById('current-song');
const currentAlbumDisplay = document.getElementById('current-album');
const currentAlbumCover = document.getElementById('current-album-cover');
const volumeSlider = document.getElementById('volume-slider');
const playlistElement = document.getElementById('playlist');
const albumsContainer = document.getElementById('albums-container');
const tourDatesContainer = document.getElementById('tour-dates');

// Cargar datos de la banda
function loadBandData() {
    // Cargar álbumes
    bandData.albums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>${album.year}</p>
            </div>
        `;
        albumCard.addEventListener('click', () => loadAlbum(index));
        albumsContainer.appendChild(albumCard);
    });

    // Cargar fechas de tour
    bandData.tourDates.forEach(date => {
        const dateElement = document.createElement('div');
        dateElement.className = 'tour-date';
        dateElement.innerHTML = `
            <div>
                <h3>${date.date}</h3>
                <p>${date.venue}</p>
            </div>
            <p>${date.location}</p>
        `;
        tourDatesContainer.appendChild(dateElement);
    });

    // Cargar el primer álbum por defecto
    if (bandData.albums.length > 0) {
        loadAlbum(0);
    }
}

// Cargar un álbum en el reproductor
function loadAlbum(albumIndex) {
    currentAlbumIndex = albumIndex;
    const album = bandData.albums[albumIndex];
    
    // Actualizar información del álbum
    currentAlbumCover.src = album.cover;
    currentAlbumDisplay.textContent = `${album.title} (${album.year})`;
    
    // Limpiar playlist
    playlistElement.innerHTML = '';
    
    // Cargar canciones
    album.songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'playlist-item';
        if (index === 0) songElement.classList.add('active');
        songElement.innerHTML = `
            <span class="playlist-item-number">${index + 1}</span>
            <span class="playlist-item-title">${song.title}</span>
            <span class="playlist-item-duration">${song.duration}</span>
        `;
        songElement.addEventListener('click', () => playSong(index));
        playlistElement.appendChild(songElement);
    });
    
    // Reproducir la primera canción
    if (album.songs.length > 0) {
        playSong(0);
    }
}

// Reproducir una canción
function playSong(songIndex) {
    const album = bandData.albums[currentAlbumIndex];
    const song = album.songs[songIndex];
    
    // Actualizar índice de canción actual
    currentSongIndex = songIndex;
    
    // Actualizar información de la canción
    currentSongDisplay.textContent = song.title;
    
    // Actualizar elementos activos en la playlist
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => item.classList.remove('active'));
    playlistItems[songIndex].classList.add('active');
    
    // Configurar y reproducir el audio
    audio.src = song.file;
    audio.load();
    audio.play();
    isPlaying = true;
    updatePlayButton();
    
    // Actualizar la duración cuando los metadatos estén cargados
    audio.onloadedmetadata = () => {
        durationDisplay.textContent = formatTime(audio.duration);
    };
}

// Actualizar el botón de play/pause
function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// Formatear tiempo (segundos a MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
});

prevBtn.addEventListener('click', () => {
    const album = bandData.albums[currentAlbumIndex];
    currentSongIndex = (currentSongIndex - 1 + album.songs.length) % album.songs.length;
    playSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
    const album = bandData.albums[currentAlbumIndex];
    currentSongIndex = (currentSongIndex + 1) % album.songs.length;
    playSong(currentSongIndex);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Actualizar barra de progreso
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Cuando termina una canción, pasar a la siguiente
audio.addEventListener('ended', () => {
    const album = bandData.albums[currentAlbumIndex];
    currentSongIndex = (currentSongIndex + 1) % album.songs.length;
    playSong(currentSongIndex);
});

// Permitir hacer clic en la barra de progreso para saltar
progressBar.parentElement.addEventListener('click', (e) => {
    const progressContainer = e.currentTarget;
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Cargar los datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadBandData);