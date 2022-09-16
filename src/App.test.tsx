import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import List from "./components/List";
import Table from "./components/Table";
import {MemoryRouter as Router} from 'react-router-dom';
import {tableDataGenerator, userNameListGenerator} from "./generator";

describe('Main App Component', () => {

    test('should render App component', () => {
        render(
            <Router>
                <App/>
            </Router>
        );
    });
})

describe('Virtual List Component', () => {

    test('should render an empty list container', async () => {
        render(
            <List items={[]}
                  renderItem={(item) => <div>{item.content}</div>}
            />
        )

        expect(screen.getByTestId('list-item-wrapper')).toBeEmptyDOMElement()
    });

    test('should render a list of rows', async () => {
        render(
            <List items={userNameListGenerator(100)}
                  renderItem={(item) => <div>{item.content}</div>}
            />
        )
        expect(screen.getByTestId('list-item-wrapper')).not.toBeEmptyDOMElement()
    });
});


describe('Virtual Table Component', () => {

    test('should render an empty table container', async () => {
        render(
            <Table items={[]}
                   fields={[]}
                   renderItem={(item) => <div>{item.content}</div>}
            />
        )

        expect(screen.getByTestId('table-item-wrapper').children.length).toBeLessThanOrEqual(1)
    });

    test('should render a table of rows and fields', async () => {
        render(
            <Table items={tableDataGenerator(100000)}
                   fields={[
                       {key: 'name', name: 'Name'},
                       {key: 'age', name: 'Age'},
                       {key: 'company', name: 'Company'}
                   ]}
                   renderItem={(item) => <div>{item.content}</div>}
            />
        )

        expect(screen.getByTestId('table-item-wrapper').children.length).toBeGreaterThan(1)
    });

});
