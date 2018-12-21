<template>
  <div>
    <div>
      <br/><h2 class="text">Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace" class="form-control">
        </gmap-autocomplete><br/>
        <button class="btn btn-primary" @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:60%;  height: 500px; margin: auto;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  export default {
    name: "GoogleMap",
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: { lat: 52.257074, lng: -7.1101 },
        markers: [],
        places: [],
        currentPlace: null
      };
    },

    mounted() {
      this.geolocate();
    },

    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;
          this.$swal({
            title: 'Add Pitch at this location?',
            text: 'Would you like to go to the Add Pitch Page?',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: 'No Thanks',
            confirmButtonText: 'Ok, lets go!'
          })
            .then((result) => {
              if (result) {
                this.$router.push('/addPitch')
              } else {
                this.$swal('Cancelled', 'Sorry for asking...')
              }
            })
        }
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    }
  };
</script>


<style scoped>
  .text {
    color: white;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
  }
</style>
