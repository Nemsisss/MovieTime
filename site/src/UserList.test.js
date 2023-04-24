import React ,{useState} from 'react';
import {render, fireEvent, waitFor, getAllByText, findByTestId, getAllByLabelText, getAllByTestId, getByTestId } from '@testing-library/react';
import UserList from './pages/UserList';
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const singleList = [
    {
        "listId" : 5,
        "listName": "list 5",
        "isPublic": false,
        "movie": []
    }
]

const afterAddList = [
    {
        "listId" : 1,
        "listName": "list 1",
        "isPublic": false,
        "movie": []
    },
    {
        "listId" : 2,
        "listName": "list 2",
        "isPublic": true,
        "movie": []
    },
    {
        "listId" : 5,
        "listName": "list 5",
        "isPublic": false,
        "movie": []
    }
]

const lists = [
    {
        "listId" : 1,
        "listName": "list 1",
        "isPublic": false,
        "movie": []
    },
    {
        "listId" : 2,
        "listName": "list 2",
        "isPublic": true,
        "movie": []
    }
]

const users = [
    {
        "id": 1,
        "email": "anglea@gmail.com",
        "password": "Password1!",
        "lists": [
            {
                "listId" : 1,
                "listName": "list 1",
                "isPublic": false,
                "movie": []
            },
            {
                "listId" : 2,
                "listName": "list 2",
                "isPublic": true,
                "movie": []
            }
        ]
    },
    {
        "id": 2,
        "email": "daniel@gmail.com",
        "password": "Performapal1!",
        "lists": [
            {
                "listId" : 3,
                "listName": "list 3",
                "isPublic": false,
                "movie": []
            },
            {
                "listId" : 4,
                "listName": "list 4",
                "isPublic": true,
                "movie": []
            }
        ]
    }
]

describe('Testing the user list', () => {
    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });


    beforeEach(() => {
        window.fetch.mockClear();
    });

    it("Initial user list landing page", async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        await act(async () => {
            render(<UserList />);
        });
    });

    it('should hit the catch statement for LoadDataOneTime', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON');
            },
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
    });

    it('should hit the catch statement for LoadUsers', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON');
            },
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
    });

    it('should hit the status 400 for LoadUsers', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 417
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
    });

    it('Click on add button', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        const addButton = getByTestId("add-button");
        await act(() => {
            fireEvent.click(addButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const privateRadio = getByTestId("private-create");
        const publicRadio = getByTestId("public-create");
        await act(() => {
            fireEvent.click(privateRadio)
        });
        await act(() => {
            fireEvent.click(publicRadio)
        });
        await act(() => {
            fireEvent.change(getByTestId('input-list'), { target: { value: 'test' } })
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => singleList,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => afterAddList,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => afterAddList,
            status: 200
        });
        global.alert = jest.fn();
        await act(() => {
            fireEvent.click(getByTestId('save-changes'))
        });
        expect(global.alert).toHaveBeenCalled();
    });
    it('Click on add button and close the window', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        const addButton = getByTestId("add-button");
        await act(() => {
            fireEvent.click(addButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const privateRadio = getByTestId("private-create");
        const publicRadio = getByTestId("public-create");
        await act(() => {
            fireEvent.click(privateRadio)
        });
        await act(() => {
            fireEvent.click(publicRadio)
        });
        await act(() => {
            fireEvent.change(getByTestId('input-list'), { target: { value: 'test' } })
        });
        await act(() => {
            fireEvent.click(getByTestId('close-button'))
        });
    });
    it('Click on add button and status 417', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);

        const addButton = getByTestId("add-button");
        await act(() => {
            fireEvent.click(addButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const privateRadio = getByTestId("private-create");
        const publicRadio = getByTestId("public-create");
        await act(() => {
            fireEvent.click(privateRadio)
        });
        await act(() => {
            fireEvent.click(publicRadio)
        });
        await act(() => {
            fireEvent.change(getByTestId('input-list'), { target: { value: 'test' } })
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => () => afterAddList,
            status: 417
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => afterAddList,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => afterAddList,
            status: 200
        });
        global.alert = jest.fn();
        await act(() => {
            fireEvent.click(getByTestId('save-changes'))
        });
        expect(global.alert).toHaveBeenCalled();
    });

    it('Click on add button and hit first catch', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        const addButton = getByTestId("add-button");
        await act(() => {
            fireEvent.click(addButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const privateRadio = getByTestId("private-create");
        const publicRadio = getByTestId("public-create");
        await act(() => {
            fireEvent.click(privateRadio)
        });
        await act(() => {
            fireEvent.click(publicRadio)
        });
        await act(() => {
            fireEvent.change(getByTestId('input-list'), { target: { value: 'test' } })
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON')
            },
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => async () => afterAddList,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => afterAddList,
            status: 200
        });
        global.alert = jest.fn();
        await act(() => {
            fireEvent.click(getByTestId('save-changes'))
        });
        expect(global.alert).toHaveBeenCalled();
    });

    it('Click on delete button and hit yes and hit no catch', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const deleteButton = getAllByTestId("delete-hover")[0];
        await act(() => {
            fireEvent.click(deleteButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const removeButton = getByTestId('remove-yes');
        console.log("REMOVE: " + removeButton);
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(removeButton);
        });
    });

    it('Click on delete button and get a status 417', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const deleteButton = getAllByTestId("delete-hover")[0];
        await act(() => {
            fireEvent.click(deleteButton)
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const removeButton = getByTestId('remove-yes');
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 417
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(removeButton);
        });
    });

    it('Click on rename and rename the list', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const renameButton = getAllByTestId('rename-hover')[0];
        await act(() => {
            fireEvent.click(renameButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const changeList = getByTestId('changeInput-list');
        await act(() => {
            fireEvent.change(changeList, { target: { value: 'test' } })
        });
        const save = getByTestId('save-changes-rename');
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(save);
        });
    });

    it('Click on rename and hit catch', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const renameButton = getAllByTestId('rename-hover')[0];
        await act(() => {
            fireEvent.click(renameButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const changeList = getByTestId('changeInput-list');
        await act(() => {
            fireEvent.change(changeList, { target: { value: 'test' } })
        });
        const save = getByTestId('save-changes-rename');
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error("error happended")
            },
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(save);
        });
    });

    it('Click on rename and change the list but run into status error', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const renameButton = getAllByTestId('rename-hover')[0];
        await act(() => {
            fireEvent.click(renameButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const changeList = getByTestId('changeInput-list');
        await act(() => {
            fireEvent.change(changeList, { target: { value: 'test' } })
        });
        const save = getByTestId('save-changes-rename');
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 417
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(save);
        });
    });

    it('Click on rename and change the list but run into catch', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const renameButton = getAllByTestId('rename-hover')[0];
        await act(() => {
            fireEvent.click(renameButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const changeList = getByTestId('changeInput-list');
        await act(() => {
            fireEvent.change(changeList, { target: { value: 'test' } })
        });
        const save = getByTestId('save-changes-rename');
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error("error happended")
            },
            status: 417
        });
        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(save);
        });
    });

    it('Click on rename and and hit the close button', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const renameButton = getAllByTestId('rename-hover')[0];
        await act(() => {
            fireEvent.click(renameButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const changeList = getByTestId('changeInput-list');
        await act(() => {
            fireEvent.change(changeList, { target: { value: 'test' } })
        });
        const close = getByTestId('close-button-rename');
        await act(() => {
            fireEvent.click(close);
        });
    });


    it('Click on compare lists', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const compareButton = getAllByTestId('compare-hover')[0];
        await act(() => {
            fireEvent.click(compareButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const user = getAllByTestId('select-user-compare')[0];
        // await userEvent.selectOptions(getByTestId("compare-first-select"), ["2"]);
        const temp = getByTestId('compare-first-select');
        console.log(temp);
        fireEvent.change(temp, { target: { value: 2 } });
        await new Promise(resolve => setTimeout(resolve, 50));
        const openUserLists = getByTestId('save-changes-compare');
        await act(() => {
            fireEvent.click(openUserLists);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const userList = getAllByTestId('user-list-compare')[0];
        const privateButton = getByTestId('private-compare');
        const publicButton = getByTestId('public-compare');
        const userInput = getByTestId('input-compare');
        await act(() => {
            fireEvent.change(getByTestId('compare-second-select'), { target: { value: 3 } });
            userEvent.selectOptions(getByTestId("compare-second-select"), ["4"]);
            fireEvent.click(userList);
            fireEvent.click(privateButton);
            fireEvent.click(publicButton);
            fireEvent.change(userInput, { target: { value: 'test' } });
        });
        const submit = getByTestId('save-changes-final-compare');
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(submit);
        });
    });


    it('Click on compare lists and receive 417 status', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const compareButton = getAllByTestId('compare-hover')[0];
        await act(() => {
            fireEvent.click(compareButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const user = getAllByTestId('select-user-compare')[0];
        // await userEvent.selectOptions(getByTestId("compare-first-select"), ["2"]);
        const temp = getByTestId('compare-first-select');
        console.log(temp);
        fireEvent.change(temp, { target: { value: 2 } });
        await new Promise(resolve => setTimeout(resolve, 50));
        const openUserLists = getByTestId('save-changes-compare');
        await act(() => {
            fireEvent.click(openUserLists);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const userList = getAllByTestId('user-list-compare')[0];
        const privateButton = getByTestId('private-compare');
        const publicButton = getByTestId('public-compare');
        const userInput = getByTestId('input-compare');
        await act(() => {
            fireEvent.change(getByTestId('compare-second-select'), { target: { value: 3 } });
            userEvent.selectOptions(getByTestId("compare-second-select"), ["4"]);
            fireEvent.click(userList);
            fireEvent.click(privateButton);
            fireEvent.click(publicButton);
            fireEvent.change(userInput, { target: { value: 'test' } });
        });
        const submit = getByTestId('save-changes-final-compare');
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 417
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        await act(() => {
            fireEvent.click(submit);
        });
    });

    it('Click on compare lists and close', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const compareButton = getAllByTestId('compare-hover')[0];
        await act(() => {
            fireEvent.click(compareButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const user = getAllByTestId('select-user-compare')[0];
        // await userEvent.selectOptions(getByTestId("compare-first-select"), ["2"]);
        const temp = getByTestId('compare-first-select');
        console.log(temp);
        fireEvent.change(temp, { target: { value: 2 } });
        await new Promise(resolve => setTimeout(resolve, 50));
        const openUserLists = getByTestId('save-changes-compare');
        await act(() => {
            fireEvent.click(openUserLists);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const userList = getAllByTestId('user-list-compare')[0];
        const privateButton = getByTestId('private-compare');
        const publicButton = getByTestId('public-compare');
        const userInput = getByTestId('input-compare');
        await act(() => {
            fireEvent.change(getByTestId('compare-second-select'), { target: { value: 3 } });
            userEvent.selectOptions(getByTestId("compare-second-select"), ["4"]);
            fireEvent.click(userList);
            fireEvent.click(privateButton);
            fireEvent.click(publicButton);
            fireEvent.change(userInput, { target: { value: 'test' } });
        });
        const submit = getByTestId('close-compare-second');
        await act(() => {
            fireEvent.click(submit);
        });
    });

    it('Click on compare lists and close on the first time', async () => {
        window.fetch.mockResolvedValueOnce({
            json: async () => lists,
            status: 200
        });
        window.fetch.mockResolvedValueOnce({
            json: async () => users,
            status: 200
        });
        const {getByTestId, getAllByTestId} = render(<UserList />);
        await new Promise(resolve => setTimeout(resolve, 50));
        const compareButton = getAllByTestId('compare-hover')[0];
        await act(() => {
            fireEvent.click(compareButton);
        });
        await new Promise(resolve => setTimeout(resolve, 50));
        const close = getByTestId("close-compare-first");
        await act(() => {
            fireEvent.click(close);
        });
    });


});

