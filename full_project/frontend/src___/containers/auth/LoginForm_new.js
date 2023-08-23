// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeField, initializeForm, login } from '../../modules/auth';
// import AuthForm from '../../components/auth/AuthForm';
// import { useNavigate } from 'react-router-dom';
// import { check } from '../../modules/user';


// const LoginForm = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [error, setError] = useState(null);

//     // 리듀서에 접근하는것 (기본값은 리듀서의 state.value 이다)
//     const { form, auth, authError, user } = useSelector(({ user, auth }) => ({
//         form: auth.login,
//         auth: auth.auth,
//         authError: auth.authError,
//         user: user.user,
//     }));

//     // 인풋 변경 이벤트 핸들러
//     const onChange = e => {
//         const { value, name } = e.target;
//         dispatch(changeField({form: 'login', key: name, value}));
//     };


//     // 폼 등록 이벤트 핸들러
//     const onSubmit = e => {
//         e.preventDefault();
//         console.log("로그인 버튼 누름");

//         const { username, password } = form;

//         console.log(username, password);

//         // console.log(login({ username, password }))

//         dispatch(login({ username, password }));
//     };


//     // 컴포넌트가 처음 렌더링될 때 form을 초기화함
//     useEffect(() => {
//         dispatch(initializeForm('login'));
//     }, [dispatch]);


//     useEffect(() => {
//         if (authError) {
//             console.log('오류발생');
//             console.log(authError);
//             setError('로그인 실패');
//             return;
//         }

//         if (auth) {
//             console.log('로그인성공');
//             dispatch(check())
//             return;
//         }
//     }, [auth, authError, dispatch])

//     useEffect(() => {
//         if (user) {
//             navigate('/');
//             try {
//                 localStorage.setItem('user', JSON.stringify(user));
//             } catch (e) {
//                 console.log('localStorage is not working');
//             }
//         }
//     }, [navigate, user]);

//     return (
//         <AuthForm
//             type="login"
//             form={form}
//             onChange={onChange}
//             onSubmit={onSubmit}
//             error={error}
//         />
//     );
// };


// export default LoginForm;