<template>
  <div class="home-container">
    <div class="left-container">
      <img class="avata" alt="avata" src="../assets/avata.jpg" />
    </div>
    <div class="right-container">
      <div class="text">
        <div class="small-text">Hello, I'm Nguyễn Anh Tài,</div>
        <div class="big-text">Full stack Developer</div>
      </div>
      <div class="contact">
        <i class="fa-solid fa-phone" @click="redirect(phoneLink)"></i>
        <i class="fa-solid fa-envelope" @click="redirect(emailLink)"></i>
        <i class="fa-brands fa-github" @click="newTab(githubLink)"></i>
        <i class="fa-brands fa-facebook" @click="newTab(fbLink)"></i>
      </div>
      <RouterLink to="/cv" class="cv-btn btn btn-primary">My CV</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const phoneLink = "tel:0389653102";
const emailLink = "mailto:anhtai05102002@gmail.com";
const githubLink = "https://github.com/taikute";
const fbLink = "https://www.facebook.com/profile.php?id=100034716938533";
function newTab(url: string) {
  window.open(url, "_blank");
}
function redirect(url: string) {
  window.location.href = url;
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avata {
  width: 250px;
  height: 250px;
}

.right-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
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
  background-color: var(--color-hover);
}

.cv-btn {
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  padding: 10px 40px;
  border-radius: 50ch;
}

@media (min-width: 768px) {
  .left-container {
    width: 40%;
  }

  .right-container {
    margin: 0;
  }

  .home-container {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    .left-container {
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
