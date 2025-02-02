import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "../contact/contact.css"

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Function that displays a success toast on bottom right of the page when form submission is successful
    const toastifySuccess = () => {
        toast('Thank you for contacting us! Our Team will get back to you within 48hours.', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback',
            toastId: 'notifyToast'
        });
    };

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {
        // Destrcture data object
        const { name, email, subject, message } = data;
        try {
            const templateParams = {
                name,
                email,
                subject,
                message
            };

            await emailjs.send(
                "service_423gfo8",
                "template_kicerto",
                templateParams,
                "kc2pjZyrhc5dxKH2b"
            );

            reset();
            toastifySuccess();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='ContactForm'>
                <div className='c-container'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <div className='contactForm'>
                                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <h1 className='contact-header'>Contact Us</h1>
                                    {/* Row 1 of form */}
                                    <div className='row formRow'>
                                        <div className='col-6'>
                                            <input
                                                type='text'
                                                name='name'
                                                {...register('name', {
                                                    required: { value: true, message: 'Please enter your name' },
                                                    maxLength: {
                                                        value: 30,
                                                        message: 'Please use 30 characters or less'
                                                    }
                                                })}
                                                className='form-control formInput'
                                                placeholder='Name'
                                            ></input>
                                            {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                                        </div>
                                        <div className='col-6'>
                                            <input
                                                type='email'
                                                name='email'
                                                {...register('email', {
                                                    required: true,
                                                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                                })}
                                                className='form-control formInput'
                                                placeholder='Email address'
                                            ></input>
                                            {errors.email && (
                                                <span className='errorMessage'>Please enter a valid email address</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Row 2 of form */}
                                    <div className='row formRow'>
                                        <div className='col'>
                                            <input
                                                type='text'
                                                name='subject'
                                                {...register('subject', {
                                                    required: { value: true, message: 'Please enter a subject' },
                                                    maxLength: {
                                                        value: 75,
                                                        message: 'Subject cannot exceed 75 characters'
                                                    }
                                                })}
                                                className='form-control formInput'
                                                placeholder='Subject'
                                            ></input>
                                            {errors.subject && (
                                                <span className='errorMessage'>{errors.subject.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Row 3 of form */}
                                    <div className='row formRow'>
                                        <div className='col'>
                                            <textarea
                                                rows={3}
                                                name='message'
                                                {...register('message', {
                                                    required: true
                                                })}
                                                className='form-control formInput'
                                                placeholder='Message'
                                            ></textarea>
                                            {errors.message && <span className='errorMessage'>Please enter a message</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='submit-btn' type='submit'>
                                            Submit
                                        </button>
                                    </div>

                                </form>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;