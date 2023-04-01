<template>
  <div class="header">
    <RouterLink to="/" class="logo"><img src="../assets/images/taco-logo.png" />Hieuhub</RouterLink>

    <nav class="navbar">
      <RouterLink @click="scrollToTop()" to="/">Home</RouterLink>
      <RouterLink @click="scrollToTop()" to="/about">About</RouterLink>
      <RouterLink @click="scrollToTop()" to="/menu">Menu</RouterLink>
      <RouterLink @click="scrollToTop()" to="/promotion">Promotions</RouterLink>
      <RouterLink @click="scrollToTop()" to="/table">Table</RouterLink>
    </nav>

    <div class="icons">
      <div id="menu-btn" class="fas fa-bars menu-btn" @click="showMenu"></div>	
			<RouterLink @click="scrollToTop()"	to="/cart"><div class="fas fa-shopping-cart cart"></div></RouterLink>

			<div v-if="!user" class="fas fa-user account">
				<ul class="drop-down-select">
					<li><RouterLink @click="scrollToTop()" to="/login">Đăng nhập</RouterLink></li>
					<li><RouterLink @click="scrollToTop()" to="/register">Đăng ký</RouterLink></li>
				</ul>
			</div>

			<div v-else class="fas fa-user account logined" style="background: #f38609; color: white;">
				<ul class="drop-down-select">
					<li><RouterLink to="/info">Tài khoản</RouterLink></li>
					<li><RouterLink to="/myorder">Giỏ hàng</RouterLink></li>
					<li><RouterLink @click="handleLogout" to="/">Đăng xuất</RouterLink></li>
				</ul>
			</div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'Header',
	methods: {
		...mapMutations(['setUser']),

		showMenu() {
			let nav_bar = document.querySelector('.header .navbar');
			nav_bar.classList.toggle('active');
		},
		scrollToTop() {
			let nav_bar = document.querySelector('.header .navbar');
			nav_bar.classList.remove('active');
			window.scrollTo(0, 0);
		},
		async handleLogout() {
			let data = await axios.get('/login', {withCredentials: true});
			await axios.post('/logout', data, {withCredentials: true});
			this.setUser("");
		}

	},
	computed: {
		...mapState(['user'])
	}
}
</script>

<style lang="scss" scoped>

#menu-btn {
	display: none;
}

.header {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: #fff;
	box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 9%;

  /** Header logo */
	.logo {
		font-size: 2rem;
		font-weight: bolder;
		color: #130f40;
		img {
			padding-right: 0.5rem;
			color: #27ae60;
		}
	}

  /** Header nav-bar */
	.navbar {
		a {
			font-size: 1.7rem;
			margin: 0 1rem;
			color: #666;
			z-index: 1;
			&:hover {
				color: #27ae60;
			}
		}
		a.router-link-exact-active {
			color: #f38609;
		}
	}

  /**Header icons */
	.icons {
		div {
			position: relative;
			height: 4.5rem;
			width: 4.5rem;
			line-height: 4.5rem;
			font-size: 2rem;
			background: #fff;
			color: #27ae60;
			border: 2px solid #27ae60;
			border-radius: 0.5rem;
			margin-left: 0.3rem;
			cursor: pointer;
			text-align: center;
			&:hover {
				color: #fff;
				background: #27ae60 !important;
			}
		}
		a.router-link-exact-active {
			.cart {
				background-color: #f38609;
				border-color: #f38609;
				color: white;
			}
			:hover {
				border: 2px solid #27ae60;
			}
		}

		.account.logined {
			border-color: #f38609;
		}

		.account {

			.drop-down-select {
				display: none;
				padding: 0;
				position: absolute;
				margin-left: -30px;
				list-style-type: none;
				border: 2px solid #27ae60;
				border-radius: 10px;
				a {
					text-decoration: none;
					color: #27ae60;
					font-size: 15px;
					font-weight: 300;
					float: left;
					width: 100px;
					border-radius: 8px;
				}
			}
			&:hover {
				border:2px solid #27ae60;
				.drop-down-select {
					display: block;
					a {
						background-color: #f7f7f7;
						&:hover {
							background-color: #f38609;
							color: white;
						}
					}
				}
			}
		}
	}
}
@media (min-width: 769px) {
	.header .icons .account:hover .drop-down-select {
    display: block;
  }
}

@media (max-width: 768px) {
	.header {
		.navbar {
			position: absolute;
			top: 99%;
			left: 0;
			right: 0;
			background: #fff;
			border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
			border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
			clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
			a {
				font-size: 2rem;
				margin: 1rem;
				display: block;
			}
		}
		.navbar.active {
			clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
			display: flex;
			justify-content: space-evenly;
		}
	}
	#menu-btn {
		display: inline-block;
	}
}
@media (max-width: 576px) {
	.header .navbar a {
		font-size: 1.5rem;
		margin: 0;
	}

	.header .icons .account .drop-down-select {
		margin-left: -50px;
	}
}

</style>