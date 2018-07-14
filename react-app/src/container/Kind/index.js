import React, {
  Component
} from 'react';
import {
  Button,
  Tabs,
  message,
  Card,
  Icon
} from 'antd';

import axios from 'axios';

import Bottom from 'component/Bottom';
import './kind.less';

const {
  TabPane
} = Tabs;

const {
  Meta
} = Card;

class Kind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classData: [{
        id: "1",
        name: "tab 1",
      }, {
        id: "2",
        name: "tab 2",
      }],
    };
  }

  componentDidMount() {
    const that = this;
    axios.get('/api/class').then((param) => {
      if (param.error) {
        return message.error(param.error);
      }
      that.setState({
        classData: param.data.data,
      });
    });
    axios.get('/api/class2').then((param) => {
      if (param.error) {
        return message.error(param.error);
      }
      that.setState({
        class2Data: param.data.data,
      });
    });
  }

  handleData = (param) => {
    const {
      class2Data,
    } = this.state;
    const that = this;

    return param.map((t) => {
      const arr = [];
      if (class2Data) {
        class2Data.forEach((c2) => {
          const {
            cat_path,
          } = c2;
          if (cat_path.split(',')[0] === t.id) {
            arr.push(c2);
          }
        })
      }
      const dom = arr.map((p) => {
        const cover = (<img alt={p.name} src={p.class_photo}/>);
        const href = `/product?class3Id=${p.id}&&className=${p.name}`;
        return (
          <a className="class2" href={href}>
            <Card
            hoverable
            cover={cover}
            >
              <Meta title={p.name}></Meta> 
            </Card>
          </a>
        );
      })

      return <TabPane tab={t.name} key={t.id}>{dom}</TabPane>;
    });
  }

  render() {
    const Dom = this.handleData(this.state.classData);
    return (
      <div className="kind">
        <header>
          <div className="title">
            分类
          </div>
        </header>
        {/*<header><Button icon="search">Search</Button></header>*/}
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: '100%' }}
        >
          {Dom}
        </Tabs>
        <Bottom />
      </div>
    );
  }
}

export default Kind;