<template>
  <div class="header row">
    <RouterLink to="/" @click="outMenu()" class="logo col-md-3 col-2 d-flex justify-content-start">
			<!-- <img src="../assets/images/taco-logo.png" />Hieuhub -->
			<span style="font-size: 3rem;">Fea</span><span style="color: #ffa31a; text-transform: none; font-size: 3rem;">stly</span>
		</RouterLink>

    <nav class="navbar col-md-6 d-md-flex justify-content-md-around justify-content-around">
      <RouterLink @click="outMenu()" to="/"><h3>Home</h3></RouterLink>
      <!-- <RouterLink @click="scrollToTop()" to="/about">About</RouterLink> -->
      <RouterLink @click="scrollToTop()" to="/menu"><h3>Menu</h3></RouterLink>
      <!-- <RouterLink @click="scrollToTop()" to="/promotion">Promotions</RouterLink> -->
      <RouterLink @click="outMenu()" to="/table"><h3>Table</h3></RouterLink>
    </nav>

    <div class="icons col-md-3 col-8	d-flex justify-content-md-end justify-content-end">
			<div class="cart">
				<RouterLink @click="outMenu()"	to="/cart">
					<div class="fas fa-shopping-cart"></div>
					<span class="qttCart" v-if="cartLength > 0 && user.userName">{{ cartLength }}</span>
				</RouterLink>
			</div>

			<div id="menu-btn" class="fas fa-bars menu-btn" @click="showMenu">
			</div>	

			<div v-if="!user.userName" class="fas fa-user account">
				<ul class="drop-down-select">
					<li><RouterLink @click="scrollToTop()" to="/login">Đăng nhập</RouterLink></li>
					<li><RouterLink @click="scrollToTop()" to="/register">Đăng ký</RouterLink></li>
				</ul>
			</div>
			

			<div v-else class="fas fa-user account logined">
				<ul class="drop-down-select">
					<li><RouterLink @click="outMenu()" to="/info">
						<!-- {{ user.userName.split(' ')[user.userName.split(' ').length - 1] }} -->Hồ sơ
					</RouterLink></li>
					<!-- <li><RouterLink @click="outMenu()" to="/info">Tài khoản của tôi</RouterLink></li> -->
					<li v-if="admin"><RouterLink @click.prevent="outMenu()" to="/admin">Quản lý</RouterLink></li>
					<li><RouterLink @click="outMenu()" to="/myorder">Đơn mua</RouterLink></li>
					<li><RouterLink @click="handleLogout" to="/">Đăng xuất</RouterLink></li>
				</ul>
			</div>

    </div>

		<div class="search-box">
			<RouterLink to="/menu" @click="scrollToTop()">
				<i class="fa-solid fa-magnifying-glass" @click="search()"></i>
			</RouterLink>
			<RouterLink to="/menu">
				<input type="text" class="search-input fw-bold" v-model="searchName" @keyup.enter="search(), scrollToTop()" placeholder="Tìm kiếm . . .">
			</RouterLink>
			<!-- <div class="row filter-dropdown" @click="">
				<div class="fa fa-sliders dropDown"></div>
			</div> -->
		</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import LoadingSearch from '../components/LoadingSearch.vue';

export default {
	name: 'Header',
	data() {
		return {
			searchName: "",
			loadingSearch: false,
			lengthIcon: 0
		}
	},

	components: {
		LoadingSearch
	},

	methods: {
		...mapMutations(['setUser', 'setAdmin', 'setLogged', 'scrollToTop', 'setShowAlertEditInfo', 'setShowLoading', 'setShowProduct', 'setShowSearchLoading']),

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

		async	search() {
			await new Promise(() => setTimeout(() => {
				this.productObj.name = this.searchName;
				this.setShowSearchLoading(true);
			}, 1000)).then(
				this.setShowSearchLoading(false),
			)
		}
	},
	computed: {
		...mapState(['user', 'admin', 'cartItem', 'productObj', 'cartLength'])
	}
}
</script>

<style lang="scss" scoped>

#menu-btn {
	display: none;
}

.header {
	// position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
  background: linear-gradient(to right, rgba($color: #000, $alpha: 1), rgba($color: #000, $alpha: 0.75));
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 20%;

	.search-box {
  width: 100%;  
  position: relative;
  margin: 0;	
	margin-top: 1rem;
  i {
    position: absolute;
		padding: 0 0.5rem;
    border-top: 0.5rem solid #222831;
    border-bottom: 0.5rem solid #222831;
    border-radius: 0.5rem;
    top: 0.6rem;
    left: 1.4rem;
    font-size: 1.8rem;
    background-color: #222831;
    color: white;
  }
  .search-input {
    padding-left: 3.8rem;
    width: 100%;
    height: 4rem;
    font-size: 15px;
    color: #222831;
    text-transform: none;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 0.7rem;
    &::placeholder {
      color: #222831;
    }
  }
}

  /** Header logo */
	.logo {
		font-size: 2rem;
		font-weight: bolder;
		color: #fff;
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
			color: #fff;
			z-index: 1;
			&:hover {
				color: #ffa31a;
			}
		}
		a.router-link-exact-active {
			color: #ffa31a;
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
			background: transparent;
			color: #fff;
			border: 2px solid transparent;
			border-radius: 0.5rem;
			margin-left: 0.3rem;
			cursor: pointer;
			text-align: center;
			z-index: 50;
			&:hover {
				color: #fff;
				border-color: 2px solid transparent;
				color: #ffa31a;
				
			}
			a {
				width: 100%;
				height: 100%;
				color: #fff;
			}
		}

		.cart {
			a {
				&:hover {
					color: #ffa31a;
				}
			}
		}

	
		.qttCart {
			position: absolute;
			left: 2.3rem;
			top: -0rem;
			font-size: 1.2rem;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: #fff;
			// z-index: 10;
			background-color: #d62e41;
			width: 2rem;
			height: 2rem;
			border-radius: 2rem;
		}

		.account.logined {
			border-color: transparent;
			// background-color: #ee4d2d;
			color: #ffa31a;
		}

		.account {

			.drop-down-select {
				display: none;
				background-color: #ffa31a;
				padding: 0;
				position: absolute;
				margin-left: -5rem;
				list-style-type: none;
				border-radius: 0.7rem;
				// border: 2px solid #27ae60;
				a {
					text-decoration: none;
					color: #fff;
					font-size: 15px;
					font-weight: 500;
					float: left;
					width: 14rem;
					// border-radius: 0.7rem;
				}
			}
			&:hover {
				border:2px solid transparent;
				border-radius: 0.7rem;
				.drop-down-select {
					display: block;
					a {
						background-color: #ffa31a;
						border-radius: 0.7rem;
						&:hover {
							background-color: #ffbe33;
							color: white;
						}
					}
				}
			}
		}
	}
}

@media (max-width: 992px)  {
  .header {
    padding: 2rem 15%;
  }
}

@media (min-width: 769px) {
	.header .icons .account:hover .drop-down-select {
    display: block;
  }
}



@media (max-width: 767px) {
	.header {
		padding: 2rem 10%;
		position: relative;
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
				color: #222831;
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
	.header {
		padding: 2rem 5%;
	}
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