import dateFormat from 'dateformat'
import { History } from 'history'
import * as React from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader,
  Card

} from 'semantic-ui-react'

import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/todos-api'
import Auth from '../auth/Auth'
import { Status } from '../types/Todo'

interface TodosProps {
  auth: Auth
  history: History
}

interface TodosState {
  status: Status[]
  newStatusContent: string
  loadingTodos: boolean
}

export class Todos extends React.PureComponent<TodosProps, TodosState> {
  state: TodosState = {
    status: [],
    newStatusContent: '',
    loadingTodos: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newStatusContent: event.target.value })
  }

  onEditButtonClick = (statusId: string) => {
    this.props.history.push(`/todos/${statusId}/edit`)
  }

  onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const newStatus = await createTodo(this.props.auth.getIdToken(), {
        content: this.state.newStatusContent,
      })
      this.state.status.push(newStatus);
      this.setState({
        status: this.state.status,
        newStatusContent: ''
      })
    } catch {
      alert('Todo creation failed')
    }
  }

  onTodoDelete = async (statusId: string) => {
    try {
      await deleteTodo(this.props.auth.getIdToken(), statusId)
      this.setState({
        status: this.state.status.filter(stat => stat.statusId != statusId)
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const status = await getTodos(this.props.auth.getIdToken())
      this.setState({
        status,
        loadingTodos: false
      })
    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Status</Header>

        {this.renderCreateTodoInput()}

        {this.renderTodos()}
      </div>
    )
  }

  renderCreateTodoInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: this.onTodoCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderTodos() {
    if (this.state.loadingTodos) {
      return this.renderLoading()
    }

    return this.renderTodosList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Statuss
        </Loader>
      </Grid.Row>
    )
  }

  renderTodosList() {
    return (
      
        this.state.status.map((stat, pos) => {

          return (
            <Card>
              {stat.attachmentUrl && (
              <Image src={stat.attachmentUrl} wrapped ui={false} /> )}
              <Card.Content>
                <Card.Meta>
                  <span className='date'></span>
                </Card.Meta>
                <Card.Description>
                  {stat.content}
                </Card.Description>
              </Card.Content>
              <Button
                icon
                color="red"
                onClick={() => this.onTodoDelete(stat.statusId)}
              >
                <Icon name="delete" />
              </Button>
              <Button
                icon
                color="blue"
                onClick={() => this.onEditButtonClick(stat.statusId)}
              >
                <Icon name="pencil" />
              </Button>
            </Card>
          )
        })
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
