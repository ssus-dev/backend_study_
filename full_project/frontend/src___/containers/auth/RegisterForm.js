import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        // auth
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        // user
        user: user.user,
    }));


    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;

        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();

        const { username, password, passwordConfirm } = form;

        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않음');
            changeField({form:'register', key:'password',value:''});
            changeField({form:'register', key:'passwordConfirm',value:''});
            return;
        }

        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요');
            return;
        }

        dispatch(register({ username, password }));
    };

    // 컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('오류발생');
            console.log(authError);
            if(authError.response.status === 409){
                return setError('이미 존재하는 계정입니다');
            }
            return setError('회원가입 실패');
        }

        if (auth) {
            console.log('회원가입성공');
            console.log(auth);
            dispatch(check());
        }

    }, [auth, authError, dispatch]);


    useEffect(() => {
        if (user) {
            console.log('check API 성공');
            console.log(user);
            navigate('/');
            try{
                localStorage.setItem('user',JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    }, [user,navigate]);


    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};


export default RegisterForm;