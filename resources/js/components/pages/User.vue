<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const users = ref([]);

const getUsers = () => {
    axios.get('/api/users').then((response) => {
        users.value = response.data
    })
}

// const form = reactive({
//     name: '',
//     email: '',
//     password: '',
// })

const createUser = (values, {resetForm}) => {
    axios.post('/api/users', values).then((response) => {
        users.value.push(response.data);
        $('#userModal').modal('hide');
        resetForm();
    })
}

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required().min(8)
});

// const createUser = () => {
//     axios.post('/api/users', form).then((response) => {
//         users.value.push(response.data);
//         form.name = '';
//         form.email = '';
//         form.password = '';
//         $('#userModal').modal('hide');
//     })
// }

onMounted(() => {
    getUsers();
});
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">User</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Starter Page</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>


    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userModal">
                        Add New
                    </button>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Registered Date</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalLabel">Add New</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <Field name="name" type="text" class="form-control" :class="{'is-invalid': errors.name}" id="username"/>

                            <span class="invalid-feedback">{{ errors.name }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <Field name="email" type="email" class="form-control" :class="{'is-invalid': errors.email}" id="email"/>
                            <span class="invalid-feedback">{{ errors.email }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <Field name="password" type="password" class="form-control" id="password" :class="{'is-invalid': errors.password}"/>
                            <span class="invalid-feedback">{{ errors.password }}</span>
                        </div>



                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
