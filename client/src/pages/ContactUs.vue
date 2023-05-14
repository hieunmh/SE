<template>
  <div class="contact-us">
    <div class="contact-us-inner row">
      <div class="col-sm-6 col-12 contact d-flex flex-column justify-content-between">
        <div class="m-md-0 d-sm-inline justify-content-start mb-sm-3">
          <div>
            <i class="fa-solid fa-house"></i>
            <p>144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
          </div>
        </div>

        <div class="m-md-0 d-sm-inline justify-content-start mb-sm-3">
          <div>
            <i class="fa-solid fa-phone"></i>
            <p>+84 91 511 57 01</p>
          </div>
        </div>

        <div class="m-md-0 d-sm-inline justify-content-start mb-sm-3">
          <div>
            <i class="fa-solid fa-envelope"></i>
            <p>21020121@vnu.edu.vn</p>
          </div>
        </div>

        <div class="m-md-0 d-sm-inline justify-content-start mb-sm-3">
          <div>
            <i class="fa-brands fa-facebook"></i>
            <p><a href="https://facebook.com">facebook/feastly</a></p>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-12 map">
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8957756966815!2d105.77971251167885!3d21.03685588053376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454caaf9fa467%3A0x4cfd76cf514e1ce1!2zMTQ0IFh1w6JuIFRo4buneSwgTWFpIEThu4tjaCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1684073404236!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.contact-us {
  width: 100%;
  background: linear-gradient(to right, rgba($color: #000, $alpha: 1), rgba($color: #000, $alpha: 0.75));
  height: 67vh;
  padding: 2rem 20%;

  .contact-us-inner {

    .map {
      div {
        aspect-ratio: 1/1;
        iframe {
          border-radius: 0.7rem;
          width: 100%;
          height: 100%;
        }
      }

    }
    .contact {
      div {
        display: flex;
        i {
          color: #fff;
          font-size: 3rem;
          margin: 0;
          margin-top: 0.5rem;
          margin-right: 2rem;
          padding: 0;

        }
        p {
          margin: 0;
          font-size: 2.5rem;
          color: #ffa31a;
          a {
            color: #ffa31a;
          }
          
        }
        &:nth-child(3) {
          p {
            text-transform: lowercase;
          }
        }
      }
    }
  }
}

@media(max-width: 1200px) {
  .contact-us {
    height: 40rem;
  }
}

@media(max-width: 992px) {
  .contact-us {
    padding: 2rem 15%;
    .contact-us-inner {
      .contact {
        div {
          p {
            font-size: 2rem;
          }
        }
      }
    }
  }
}

@media(max-width: 767px) {
  .contact-us {
    padding: 2rem 10%;

  }
}

@media(max-width: 576px) {
  .contact-us {
    padding: 2rem 5%;
    height: 70vh;
    .contact-us-inner {
      .map {
        div {
          iframe {
            padding: 15% 15%;
            border-radius: 0.7rem;
          }
        }
      }
      .contact {
        padding: 0 15%;
        div {
          margin-bottom: 2rem;
        }
      }
    }
  }
}



</style>