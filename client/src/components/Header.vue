<template>
  <div class="header row">
    <RouterLink to="/" @click="outMenu()" class="logo col-md-4 col-4 d-flex justify-content-md-center justify-content-start">
			<img src="../assets/images/taco-logo.png" />Hieuhub
		</RouterLink>

    <nav class="navbar col-md-4 d-md-flex justify-content-md-between justify-content-around">
      <RouterLink @click="outMenu()" to="/">Home</RouterLink>
      <!-- <RouterLink @click="scrollToTop()" to="/about">About</RouterLink> -->
      <RouterLink @click="scrollToTop()" to="/menu">Menu</RouterLink>
      <!-- <RouterLink @click="scrollToTop()" to="/promotion">Promotions</RouterLink> -->
      <RouterLink @click="outMenu()" to="/table">Table</RouterLink>
    </nav>

    <div class="icons col-md-4 col-8	d-flex justify-content-md-center justify-content-end">
			<div>
				<span class="qttCart" v-if="cartItem.length > 0 && user.userName">{{ cartItem.length }}</span>
				<RouterLink @click="outMenu()"	to="/cart">
					<div class="cart"><i class="fas fa-shopping-cart"></i></div>
				</RouterLink>
			</div>

			<div v-if="!user.userName" class="fas fa-user account">
				<ul class="drop-down-select">
					<li><RouterLink @click="scrollToTop()" to="/login">Đăng nhập</RouterLink></li>
					<li><RouterLink @click="scrollToTop()" to="/register">Đăng ký</RouterLink></li>
				</ul>
			</div>

			<div v-else class="fas fa-user account logined" style="background: #f38609; color: white;">
				<ul class="drop-down-select">
					<li><RouterLink @click="outMenu()" to="/info">Tài khoản</RouterLink></li>
					<li v-if="admin"><RouterLink @click.prevent="outMenu()" to="/admin">Quản lý</RouterLink></li>
					<li><RouterLink @click="outMenu()" to="/myorder">Đơn hàng</RouterLink></li>
					<li><RouterLink @click="handleLogout" to="/">Đăng xuất</RouterLink></li>
				</ul>
			</div>

			<div id="menu-btn" class="fas fa-bars menu-btn" @click="showMenu"></div>	
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'Header',
	methods: {
		...mapMutations(['setUser', 'setAdmin', 'setLogged', 'scrollToTop', 'setShowAlertEditInfo', 'setShowLoading', 'setShowProduct']),

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
			await axios.post('/logout',{},  {withCredentials: true});
			this.setUser([]);
			this.setShowProduct(false);
			this.setShowLoading(true);

			setTimeout(() => {
				this.setShowLoading(false);
				this.setAdmin(null);
				this.setLogged(false);
			}, 1000);
		},

		toInfo() {
			this.setShowAlertEditInfo(false);
			this.setShowProduct(false);
			this.scrollToTop();
		},
		
		outMenu() {
			this.setShowProduct(false);
			this.scrollToTop();
		},
	},
	computed: {
		...mapState(['user', 'admin', 'cartItem'])
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
	z-index: 100;
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
		> div {
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
				div {
					color: #fff;
				}
			} 
			div {
				width: 100%;
				height: 100%;
				color: #27ae60;
			}
		}
	
		.qttCart {
			position: absolute;
			left: -1.3rem;
			top: -1.4rem;
			font-size: 1.2rem;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: #fff;
			z-index: 50;
			background-color: #d62e41;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 2rem;
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

// @media(max-width: 456px) {
// 	.header {
// 		.icons {
// 			> div {
// 				height: 4rem;
// 				width: 4rem;
// 				line-height: 4rem;
// 			}
// 		}
// 	}
// }

</style>