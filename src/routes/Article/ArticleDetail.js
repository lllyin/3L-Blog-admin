import React, { Component } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
import { Card, Input, Button, Tabs,Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CodeBlock from './CodeBlock';
import TableRender from './TableRender';
import styles from "./NewArticle.less";

const { TabPane } = Tabs;
const { TextArea } = Input;

@connect(({ article,loading }) => ({
  article,
  loading,
}))
export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
    }
  }

  // 处理标题改变
  handleTitleChange = (e) => {
    const { article } = this.state;
    this.setState({
      article: { ...article, title: e.target.value },
    })
  }

  // 处理markdown编辑器改变
  handleContentChange = (e) => {
    const { article } = this.state;
    this.setState({
      article: { ...article, content:e.target.value },
    })
  }

  // 提交文章
  handleSubmit = () => {
    const { article } = this.state;
    const { dispatch } = this.props;

    const newArticle = {
      ...article,
      author: 'lyin',
      create_time: Date.parse(new Date()) / 1000,
    };
    dispatch({
      type: 'article/add',
      data: newArticle,
    })
  }

  render() {
    const {article}= this.state;
    const {loading} = this.props;

    return (
      <PageHeaderLayout
        title="文章详情"
      >
        <Card>
          <div className={styles.title}>
            <Input placeholder="文章标题" onChange={this.handleTitleChange} />
          </div>
          <div className={styles.content}>
            <Tabs defaultActiveKey="code">
              <TabPane key="code" tab={<span><Icon type="code-o" />Markdown</span>}>
                <TextArea
                  autosize={{
                    minRows:18,
                    maxRows:28,
                  }}
                  onChange={this.handleContentChange}
                />
              </TabPane>
              <TabPane key="preview" tab={<span><Icon type="file-text" />预览</span>}>
                <div className={styles['preview-wrap']}>
                  <ReactMarkdown
                    className="result"
                    source={article.content || ''}
                    renderers={{code: CodeBlock,table:TableRender}}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className={styles['submit-wrap']}>
            <Button type="primary" onClick={this.handleSubmit} loading={loading.models.article}>提交</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    )
  }
}