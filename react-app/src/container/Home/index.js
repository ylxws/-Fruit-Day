import React, {
  Component
} from 'react';
import {
  Icon
} from 'antd';

import Bottom from 'component/Bottom';
import Banner from 'component/Banner';
import './home.less';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: [{
        title: "https://imgjd6.fruitday.com/images/2018-05-18/38dd1fde3fdc569af819a05b06f1357e.jpg",
        picture: [{
          src: "https://imgjd4.fruitday.com/images/2018-05-18/70ec630847d0a9d78aa210ba67452bf2.jpg",
          title: "海南西瓜 1个",
          id: "26520",
        }, {
          src: "https://imgqn8.fruitday.com/images/2018-05-18/5a234bc16efb66cfe4125a36f3396f14.jpg",
          title: "巨无霸-佳沛新西兰阳光金奇异果 6个",
          id: "20752",
        }],
      }, {
        title: "https://imgjd6.fruitday.com/images/2018-05-18/a514032853008a5999a133de08e74aca.jpg",
        picture: [{
          src: "https://imgjd5.fruitday.com/images/2018-05-18/43da955aea5717c02fafc58790c2cdfc.jpg",
          title: "四川不知火柑 1kg",
          id: "30719",
        }, {
          src: "https://imgjd1.fruitday.com/images/2018-05-18/a3d5a651337282019eb5ac2587942436.jpg",
          title: "新西兰ROCKIT小苹果礼盒装 1盒(4管)",
          id: "22899",
        }],
      }],
    };
  }

  handleDom = (data) => {
    const dom = data.map((sec) => {
      return (
        <div>
          <div className="section">
            <img src={sec.title} />
          </div>
          <div className="section-item">
            {
              sec.picture.map((item) => {
                const href = `/detail?ProductId=${item.id}`;
                return (
                  <a 
                  href={href}
                  data-id={item.id}
                  >
                    <img
                      src={item.src}
                      title={item.title}
                    />
                  </a>
                )
              })
            }
          </div>
        </div>
      )
    });
    return dom;
  }

  render() {
    const {
      section
    } = this.state;
    const dom = this.handleDom(section);
    return (
      <div className="home">
        <div className="content">
          <header>
            <div className="title">
              天天农场，只为更好的生活
            </div>
          </header>
          <Banner />
          <div className="ad">
            {dom}
          </div>
        </div>
        <Bottom />
      </div>
    );
  }
}

export default User;