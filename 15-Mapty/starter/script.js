'use strict';

// prettier-ignore
class Workout{
    // take in the data that is common to both the workouts

    date = new Date(); //  we need the current date
    id = (Date.now() + '').slice(-10); // create temp id from the current date
    clicks = 0;



    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    _click(){
        this.clicks++;
    }
}

class Running extends Workout{
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed(){
        // km/h
        this.speed = this.distance / (this.duration / 60)
        return this.speed;
    }
}

// const run1 = new Running([12, 12], 5.2, 24, 178);
// const cycling = new Cycling([12, 12], 5.2, 22, 12);

// console.log(run1, cycling);

//////////////////////////////////////////////////
// APPLICATION

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapEvent;
    #workouts = [];
    #mapZoomLevel = 13;

    constructor(){
        // this.workouts = [];
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage();
    
        // attaching event handlers to the constructor
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

        // ensure cadence is assigned to running and E.gain to cycling
        if (inputType.value === 'Running' && inputCadence.closest('.form__row').classList.contains('form__row--hidden')) this._toggleElevationField();

        if (inputType.value === 'Cycling' && inputElevation
        .closest('.form__row').classList.contains('form__row--hidden')) this._toggleElevationField();
    }

    _getPosition(){
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
                alert('Could not get your position')
        });
    }

    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        // console.log(`https://www.google.co.uk/maps/@${latitude},${longitude},14z`);

        // any variable that is global is accessible in other scripts where it is included

        const coords = [latitude, longitude];

        // selects the div with the id 'map'
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
            this._renderWorkout(work);
        });
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm(){
        // Empty inputs
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = "";
        // form.style.display = 'none';
        form.classList.add('hidden');
        // setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        // some helper functions
        const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input));
        const allPositive = (...inputs) => inputs.every(input => input > 0);

        e.preventDefault();

        // Get data from the form
        const type = inputType.value;
        // the + converts to number if the string is already in the form of a number
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const{lat, lng} = this.#mapEvent.latlng;


        // If workout running, create running object
        let workout;
        if (type === 'running'){
            const cadence = +inputCadence.value;
            // Check if data is valid
            if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) 
                return alert('Inputs have to be positive numbers!');
            
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout cycling, create cycling object
        if (type === 'cycling'){
            const elevation = +inputElevation.value;
            // Check if data is valid
            if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) 
                return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);
        // console.log(this.#workouts);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        // Hide form and input fields
        this._hideForm();
        
        // Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout){
        // adds marker to the map
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            })
        )
        .setPopupContent(`${ workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout){
        // render the workouts as a list on the page
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description} <span class="workout__button">Delete</span></h2>
            <div class="workout__details">
            <span class="workout__icon">${
                workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
            </div>
        `;

        if (workout.type === 'running')
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
                </div>
            </li>
            `;
        if (workout.type === 'cycling')
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
                </div>
            </li>
            `;

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        // console.log(workoutEl);

        if (e.target.closest('.workout__button')){
            if (e.target.closest('.workout__button').textContent === 'Delete') this._deleteWorkout(e.target.closest('.workout'));
            
            return;
        }

        if(!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        // console.log(workout);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 0.5
            }
        });

        // using the public interface
        // workout._click();
    }

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // is an api that the browser provides
        // don't use local storage for large amounts of data
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if (!data) return;

        this.#workouts = data;
    }

    _deleteWorkout(e){
        console.log(e);
        const id = e.dataset.id;
        console.log(id);
        const index = this.#workouts.findIndex(i => i.id == id);
        console.log(index);
        this.#workouts.splice(index, 1);
        // delete from local storage
    }

    reset(){
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();
