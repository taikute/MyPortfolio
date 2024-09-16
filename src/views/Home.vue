<template>
  <div class="container">
    <div class="left">
      <img class="avata" alt="avata" src="../assets/avata.jpg" />
    </div>
    <div class="right">
      <div class="text">
        <div class="small-text">Hello, I'm Nguyễn Anh Tài,</div>
        <div class="big-text">Full stack Developer</div>
      </div>
      <div class="contact">
        <i class="fa-solid fa-phone" @click="redirect('tel:0389653102')"></i>
        <i
          class="fa-solid fa-envelope"
          @click="redirect('mailto:anhtai05102002@gmail.com')"
        ></i>
        <i
          class="fa-brands fa-github"
          @click="newTab('https://github.com/taikute')"
        ></i>
        <i
          class="fa-brands fa-facebook"
          @click="
            newTab('https://www.facebook.com/profile.php?id=100034716938533')
          "
        ></i>
      </div>
      <RouterLink to="/cv" class="cv-btn btn btn-primary">My CV</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
function newTab(url: string) {
  window.open(url, "_blank");
}
function redirect(url: string) {
  window.location.href = url;
}
</script>

<style scoped>
.left {
  text-align: center;
}

.avata {
  width: 250px;
  height: 250px;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 20px 0 20px;
}

.small-text {
  font-size: 18px;
}

.big-text {
  font-size: 40px;
  margin-top: 10px;
  font-weight: 600;
}

.contact {
  justify-content: center;
  display: flex;
  margin: 30px 0 0;
}

.contact i {
  font-size: 30px;
  padding: 5px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.contact i:hover {
  background-color: var(--color-text-hover);
}

.cv-btn {
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  padding: 10px 40px;
  border-radius: 50ch;
}

@media (min-width: 768px) {
  .left {
    width: 40%;
  }

  .right {
    margin: 0;
  }

  .container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .left {
      width: 50%;
    }

    .small-text {
      font-size: 20px;
    }

    .big-text {
      font-size: 50px;
    }

    .avata {
      width: 350px;
      height: 350px;
    }

    .contact i {
      font-size: 35px;
      padding: 8px 25px;
    }

    .cv-btn {
      font-size: 25px;
    }
  }
}
</style>
