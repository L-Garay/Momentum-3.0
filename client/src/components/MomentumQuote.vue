<template>
  <div class="momentum-quote">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 bg-transparent text-dark momentum-quote">
          <p class="d-flex justify-content-center mb-1">
            "You miss 100% of the shots you dont take"
          </p>
          <p class="d-flex justify-content-center">
            Author: John Wilkes Booth
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "momentum-quote"
};
</script>

<style>
.momentum-quote {
  position: fixed;
  bottom: 0;
}
p {
  font-size: 18px;
}
@media (max-width: 768px) {
  p {
    font-size: 13px;
  }
}
</style>