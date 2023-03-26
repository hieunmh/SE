<template>
  <div class="">
    <div class="home-main">
      <div class="content">
        <span>Home page</span>
        <h3 v-if="user">Xin chào {{ user }}</h3>
				<h3 v-else>SIUUUUUU</h3>
        <p>Welcome to the League of Draven</p>
        <RouterLink to="/menu" class="btnn">Menu</RouterLink>
      </div>

      <div class="image">
        <img src="../assets/images/b.png" class="home-img-1">
        <img src="../assets/images/a.png" class="home-img-2">
      </div>
    </div>
    
    <div class="home-category">
      <RouterLink to="/" class="box">
        <img src="../assets/images/banhxeo.png" alt="">
        <h3>Bánh xèo</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
				<img src="../assets/images/banhxeo.png" alt="">
				<h3>Bánh xèo</h3>
        </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/dessert.png" alt="">
        <h3>Salad</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/dessert.png" alt="">
        <h3>Salad</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/drink.png" alt="">
        <h3>7 Up</h3>
      </RouterLink>

      <RouterLink to="/" class="box">
        <img src="../assets/images/drink.png" alt="">
        <h3>7 Up</h3>
      </RouterLink>
    </div>

    <div class="home-banner">
      <div class="grid-banner row">
        <div class="grid col-md-4">
          <img src="../assets/images/banhxeo-banner.jpg" alt="">
          <div class="content">
            <span>Giảm giá đặc biệt</span>
            <h3>lên đến 50%</h3>
            <RouterLink @click="scrollToTop()" to="/menu" class="btnn">Mua ngay</RouterLink>
          </div>
        </div>

        <div class="grid col-md-4">
          <img src="../assets/images/salad-banner.jpg" alt="">
          <div class="content">
            <span>Giảm giá đặc biệt</span>
            <h3>lên đến 50%</h3>
            <RouterLink @click="scrollToTop()" to="/menu" class="btnn">Mua ngay</RouterLink>
          </div>
        </div>

        <div class="grid col-md-4">
        	<img src="../assets/images/drink-banner.jpg" alt="">
          <div class="content">
            <span>Giảm giá đặc biệt</span>
            <h3>lên đến 50%</h3>
            <RouterLink @click="scrollToTop()" to="/menu" class="btnn">Mua ngay</RouterLink>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Home',
	data() {
		return {

		}
	},
	methods: {
		...mapMutations(['scrollToTop'])
	},
	computed: {
		...mapState(['user'])
	}
	
}
</script>
<style lang="scss" scoped>

/** home main */
.home-main {
	padding: 2rem 9%;
	display: flex;
	align-items: center;
	flex-wrap: wrap-reverse;
	gap: 2rem;
	position: relative;
	overflow: hidden;
	.content {
		flex: 1 1 41rem;
		span {
			font-size: 2rem;
			color: #27ae60;
		}
		h3 {
			font-size: 4rem;
			color: #130f40;
			padding-top: 1rem;
		}
		p {
			font-size: 1.4rem;
			color: #666;
			line-height: 2;
			padding: 1rem 0;
		}
	}
	.image {
		flex: 1 1 41rem;
		margin: 2rem 0;
		pointer-events: none;
		.home-img-1 {
			width: 100%;
			margin-top: 5rem;
		}
	}
	.home-img-2 {
			position: absolute;
			top: -15rem;
			right: -15rem;
			width: 80vw;
		}
}

/** home category */
.home-category {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	gap: 1.5rem;
	padding-bottom: 5rem;
  padding: 2rem 9%;
	.box {
		padding: 2rem;
		text-align: center;
		border-radius: 0.5rem;
		background: #f1f1f1;
		color: #27ae60;
		&:hover {
			background: #27ae60;
			h3 {
				color: #fff;
			}
		}
		img {
			height: 7rem;
		}
	}
}

/**home-banner */
.home-banner {
  padding: 2rem 9%;
	.row-banner {
		// background: url(../assets/images/row-banner.png) no-repeat;
		height: 45rem;
		background-size: cover;
		background-position: center;
		position: relative;
		.content {
			position: absolute;
			top: 50%;
			left: 7%;
			transform: translateY(-50%);
			span {
				font-family: 'Satisfy', cursive;
				font-size: 4rem;
				color: #27ae60;
				color: #130f40;
			}
			h3 {
				font-size: 6rem;
				color: red;
				text-transform: uppercase;
			}
			p {
				font-size: 2rem;
				padding-bottom: 1rem;
			}
		}
	}
	.grid-banner {
		.grid {
			display: block;
			border-radius: 3rem;
			padding: 0rem;
			overflow: hidden;
			max-height: 40rem;
			border: 1rem solid white;
			img {
				border-radius: 1rem;
				height: 100%;
				width: 100%;
			}
			&:hover {
				img {
					transform: scale(1.2);
				}
			}
			.content {
				position: absolute;
				top: 2rem;
				padding: 0 2rem;
				span {
					font-size: 2.5rem;
					color: #fff;
				}
				h3 {
					font-size: 3rem;
					color: #fff;
					padding-top: .5rem;
				}
			}
			.content.center {
				text-align: center;
				width: 100%;
				span {
					color: #666;
				}
				h3 {
					color: #130f40;
				}
			}
		}
	}
}




@media (max-width: 768px) {
	.home-main {
		.home-img-2 {
			top: 0;
			right: 0;
			width: 100%;
		}
	}
  .home-banner {
    .grid-banner {
      .content {
        h3 {
          font-size: 15px !important;
        }
      }
      .content.center {
        padding-left: 0px !important;
      }
    }
}
}
@media (max-width: 576px) {
	.home-main {
		.content {
			h3 {
				font-size: 3rem;
			}
			p {
				font-size: 1.5rem;
			}
		}
	}
}
</style>