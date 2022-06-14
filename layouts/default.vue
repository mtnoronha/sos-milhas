<template>
  <div>
    <header class="menu">
      <div>
        <nuxt-link class="link" to="/">Inicio</nuxt-link>
        <nuxt-link class="link" to="/compraInteligente">
          Compra Inteligente
        </nuxt-link>
        <nuxt-link class="link" to="/compraPontos">
          Compra de Pontos
        </nuxt-link>

        <nuxt-link class="link" to="/vendaMilhas">Venda de Milhas </nuxt-link>
      </div>
    </header>
    <section class="body">
      <Nuxt />
    </section>
  </div>
</template>

<style>
input {
  height: 30px;
  padding-left: 10px;
  border: none;
  border-radius: 7px;
  margin: 2px;
  font-size: 16px;
  background-color: #bf07139b;
  color: white;
}

body {
  background: #161616;
  color: white;
}

section.body {
  padding: 50px;
}

button {
  background-color: #bf0713;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

button:hover {
  opacity: 0.75;
}

.link {
  color: #bf0713;
}

.link:hover {
  opacity: 0.75;
}

.menu {
  border-radius: 2px;
  background: #202125;
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  padding: 20px 0;
  z-index: 999;
  align-content: center;
  align-items: center;
  justify-content: space-between;
}

.menu img {
  width: 200px;
  margin-left: 10%;
}

.menu div {
  display: flex;
  margin: 0 20%;
}

.menu div a {
  padding: 20px;
  font-size: 26px;
}

@media all and (max-width: 700px) {
  section.body {
    padding: 10px;
  }

  .menu {
    justify-content: center;
    font-size: 15px;
  }

  .menu div {
    margin: 0;
  }

  .menu div a {
    padding: 10px;
    font-size: 15px;
  }

  .menu img {
    width: 100px;
    margin-left: 1%;
  }
}
</style>
