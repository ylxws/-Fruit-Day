import React, {
  Component
} from 'react';
import {
  Carousel
} from 'antd';

import './banner.less';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [{
        src: "https://imgjd2.fruitday.com/images/2018-05-02/11092187872551390e546f7fc7902df1.jpg",
        alt: "",
        title: "",
      }, {
        src: "https://imgjd5.fruitday.com/images/2018-05-15/19bc761eba456fff94bf4dac7937ad84.jpg",
        alt: "",
        title: "",
      }, {
        src: "https://imgjd7.fruitday.com/images/2018-05-16/61c05eb336338bdfbe332687dbb5560a.jpg",
        alt: "",
        title: "",
      }, {
        src: "https://imgjd5.fruitday.com/images/2018-05-04/d49e5d14d032144450caef36975c711f.jpg",
        alt: "",
        title: "",
      }]
    };
  }

  render() {
    const {
      banner
    } = this.state;
    return (
      <Carousel autoplay>
      {
        banner.map((ban) => {
          return (
            <div>
              <img
                src={ban.src}
                alt={ban.alt}
                title={ban.title}
                className="home-banner"
              />
            </div>
          );
        })
      }
      </Carousel>
    );
  }
}

export default Banner;