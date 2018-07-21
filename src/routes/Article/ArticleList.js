import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Form, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CustomizableTable from '../../components/CustomTable/CustomizableTable';
import { WEB_URL } from '../../constant/config'

const columns = [{
  title: '序号',
  dataIndex: 'idx',
  key: 'idx',
  render: (text, record, idx) => (<span>{idx + 1}</span>),
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '内容',
  dataIndex: 'content',
  key: 'content',
  render: text => (<span>{text.substr(0, 50)}</span>),
}, {
  title: '创建时间',
  dataIndex: 'create_time',
  key: 'create_time',
  render: time => (<span>{moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>),
}, {
  title: '更新时间',
  dataIndex: 'update_time',
  key: 'update_time',
  render: time => (<span>{time ? moment(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '无修改记录'}</span>),
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <Fragment>
      <a href={`${WEB_URL}/#/blog/detail?id=${record._id}`} target="_blank" rel="noopener noreferrer">查看</a>
      <Divider type="vertical" />
      <a href={`#/article/list/edit?id=${record._id}`}>编辑</a>
    </Fragment>
  ),
}];

@connect(({ article, loading }) => ({
  article,
  loading,
}))
@Form.create()
export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetch',
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { article, loading } = this.props;
    const rowSelection = {
      fixed: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    console.log(article);
    return (
      <PageHeaderLayout
        title="文章列表"
      >
        <Card>
          <CustomizableTable
            loading={loading.models.article}
            rowSelection={rowSelection}
            data={article.list}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
            onChange={this.handleCustomizableTableChange}
            onSelectRow={this.handleSelectRows}
            total={[]}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
