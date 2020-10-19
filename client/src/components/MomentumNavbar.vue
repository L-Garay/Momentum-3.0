<template>
  <div class="momentum-navbar">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-11 p-0 mt-3">
          <nav class="navbar-light bg-transparent">
            <div class="row d-flex justify-content-end">
              <div class="col-md-4 col-lg-2 bg-dark text-light weather-widget">
                <div class="pt-2 pb-2 pr-3 pl-3">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0">Clouds</p>
                    <p class="mb-0">4/20/2020</p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <p class="outside-degrees">
                      68 &#8457;
                    </p>
                    <form action="">
                      <input type="text" placeholder="Enter City" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "momentum-navbar"
};
</script>

<style>
input {
  border-radius: 5px;
  height: 20px;
  width: 90px;
}
.outside-degrees {
  font-size: 22px;
  margin-bottom: 0;
}
.weather-widget {
  border-radius: 5px;
}
@media (min-width: 992px) {
  .col-lg-2 {
    min-width: 250px;
  }
}
</style>