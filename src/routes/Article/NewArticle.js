import React, { Component } from "react";
import { Card, Input,Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { TextArea } = Input;

export default class NewArticle extends Component {

  render() {
    return (
      <PageHeaderLayout
        title="新增文章"
        content="文章千古事，得失寸心知。"
      >
        <Card>
          <TextArea
            autosize={{ minRows: 26 }}
          />
          <Button type="primary">提交</Button>          
        </Card>
      </PageHeaderLayout>
    )
  }
}