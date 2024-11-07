import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/css/profile.css";

function ProfilePage() {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
  };

  return (
    <>
      <style jsx>{`
        .special-left {
          flex: 1 1 300px;
          padding-left: 18%;
        }

        .ppl-25 {
          padding-left: 25%;
        }
        .best-bg {
          background-color: #d5e4e9;
        }
        .zindex {
          z-index: 100;
        }
      `}</style>

      {/* bootstrap  */}
      {/* <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossOrigin="anonymous"
  /> */}
      <section className="pt-5 best-bg ">
        <div className="container ">
          <div className="row">
            <div className="col-xl-12">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="card  border    rounded-3 mb-3   ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom ">
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="card-header-title mb-0 fs-5">
                        Profile Information
                      </h3>
                      <button
                        // className={`btn btn-${
                        //   isEditable ? "success" : "primary"
                        // } btn-sm`}
                        className="btn btn-primary btn-sm bg-primary"
                        // onClick={handleUpdate}
                      >
                        {/* {isEditable ? "Save" : "Edit"} */}
                        Save
                      </button>
                    </div>
                  </div>
                  {/* Card body START */}
                  <div className="card-body ">
                    <div className="d-flex flex-wrap justify-content-between  ">
                      {/* Left side: Image Upload */}
                      <div
                        className="upload-image mb-4 ppl-25 "
                        // style={{ flex: "1 1 120px", paddingLeft: "25%" }}
                      >
                        <label
                          className="rounded-circle position-relative cursor-pointer mb-4"
                          style={{ height: 120, width: 120 }}
                        >
                          <input
                            type="file"
                            className="imageUpload mb-2"
                            name="photo"
                            id="photo"
                            required=""
                            accept="image/*"
                            data-error="profile_photo-errors"
                          />
                          <input
                            type="hidden"
                            name="old_photo"
                            id="old_photo"
                            defaultValue=""
                          />
                          <img
                            src="  "
                            className="uploaded-image img-fluid rounded-circle object-fit-cover border imagePreview"
                            width={120}
                            height={120}
                            alt=""
                            style={{ height: 120, width: 120 }}
                          />
                          <img
                            src=""
                            className="edit-absolute"
                            width={36}
                            height={36}
                            alt=""
                            style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              display: "none",
                            }}
                          />
                        </label>
                        <div className="profile_photo-errors" />
                      </div>
                      {/* Right side: Profile Information (Name, ID, Gender) */}
                      <div
                        className="d-flex flex-column mt-4 justify-content-center flex-grow-1 ppl-25 "
                        // style={{ flex: "1 1 300px", paddingLeft: "18%" }}
                      >
                        <div className="mb-2">
                          <p className="form-control-static" id="user_name">
                            {/* Name : {profile.firstName} {profile.lastName} */}
                            Name : abc xyz
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="form-control-static" id="user_id">
                            {/* ID: {profile.id} */}
                            ID : 12454
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="form-control-static" id="user_role">
                            {/* Role : {profile.role} */}
                            Role : Manager
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border rounded-3 mb-3 ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">
                      Basic Information
                    </h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-md-4 mb-4 ">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          {...register("firstname", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.firstname && (
                          <p className="error-message">{errors.firstname.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          {...register("lastname", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.lastname && (
                          <p className="error-message">{errors.lastname.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>ID</label>
                        <input
                          type="text"
                          name="id"
                          {...register("id", {
                            required: "ID is required",
                            minLength: {
                              value: 3,
                              message: "ID must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "ID cannot exceed 50 characters",
                            },
                          })

                          }
                          className="form-control"
                        />
                        {errors.id && (
                          <p className="error-message">{errors.id.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-4 mb-4">
                        <label>Father's Name</label>
                        <input
                          type="text"
                          name="fatherName"
                          {...register("fathername", {
                            required: "Father Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Father Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Father Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.fathername && (
                          <p className="error-message">{errors.fathername.message}</p>
                        )}
                        
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Mother's Name</label>
                        <input
                          type="text"
                          name="motherName"
                          {...register("mothername", {
                            required: "Mother Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Mother Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Mother Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.mothername && (
                          <p className="error-message">{errors.mothername.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          {...register("dob", {
                            required: "Date of Birth is required",
                          })}
            
                          className="form-control"
                        />
                        {errors.dob && (
                          <p className="error-message">{errors.dob.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-4 mb-4">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid Email",
                            },
                          })}

                          className="form-control"
                        />
                        {errors.email && (
                          <p className="error-message">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Invalid Phone",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.phone && (
                          <p className="error-message">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Gender</label>
                        <select
                          name="gender"
                          {...register("gender", {
                            required: "Gender is required",
                          }
                          )}
                          className="form-control"
                        >

                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label>Role</label>
                        <input
                          type="text"
                          name="role"
                          {...register("role", { required: "Role is required" })}

                          className="form-control"
                        />
                        {errors.role && (
                          <p className="error-message">{errors.role.message}</p>
                        )}

                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Nationality</label>
                        <input
                          type="text"
                          name="nationality"
                          {...register("nationality", {
                            required: "Nationality is required",
                          })}

                          className="form-control"
                        />
                        {errors.national
                          && (
                            <p className="error-message">{errors.nationality.message}</p>   
                          )}
                        
                      </div>
                      <div className="col-md-4 ">
                        <label>Religion</label>
                        <input
                          type="text"
                          name="religion"
                          {...register("religion", {
                            required: "Religion is required",
                          })}

                          className="form-control"
                        />
                        {errors.religion && (
                          <p className="error-message">{errors.religion.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card  border rounded-3 mb-3 ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">Address</h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Block</label>
                          <input
                            type="text"
                            name="block"
                            {...register("block", {
                              required: "Block is required",
                            })}
                            className="form-control"
                          />
                          {errors.block && (
                            <p className="error-message">{errors.block.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Street</label>
                          <input
                            type="text"
                            name="street"
                            {...register("street", {
                              required: "Street is required",
                            })}
                            className="form-control"
                          />
                          {errors.street && (
                            <p className="error-message">{errors.street.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Village</label>
                          <input
                            type="text"
                            name="village"
                            {...register("village", {
                              required: "Village is required",
                            })}
                            className="form-control"
                          />
                          {errors.village && (
                            <p className="error-message">{errors.village.message}</p>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Taluka</label>
                          <input
                            type="text"
                            name="taluka"
                            {...register("taluka", {
                              required: "Taluka is required",
                            })}

                            className="form-control"
                          />
                          {errors.taluka && (
                            <p className="error-message">{errors.taluka.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>District</label>
                          <input
                            type="text"
                            name="district"
                            {...register("district", {
                              required: "District is required",
                            })}

                            className="form-control"
                          />
                          {errors.district && (
                            <p className="error-message">{errors.district.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            {...register("pincode", {
                              required: "Pincode is required",
                              pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Invalid Pincode",
                              },  
                            })}

                            className="form-control"
                          />
                          {errors.pincode && (
                            <p className="error-message">{errors.pincode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            {...register("state", {
                              required: "State is required",
                            })}
                            className="form-control"
                          />
                          {errors.state && (
                            <p className="error-message">{errors.state.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                            className="form-control"
                          />
                          {errors.country && (
                            <p className="error-message">{errors.country.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card  border rounded-3 mb-3">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">
                      Personal Details
                    </h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Bank Name</label>
                          <input
                            type="text"
                            name="bankName"
                            {...register("bankName", {
                              required: "Bank Name is required",
                            })}
                            className="form-control"
                          />
                          {errors.bankName && (
                            <p className="error-message">{errors.bankName.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>IFSC Code</label>
                          <input
                            type="text"
                            name="ifscCode"
                            {...register("ifscCode", {
                              required: "IFSC Code is required",
                            })}
                            className="form-control"
                          />
                          {errors.ifscCode && (
                            <p className="error-message">{errors.ifscCode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Account Number</label>
                          <input
                            type="text"
                            name="accountNumber"
                            {...register("accountNumber", {
                              required: "Account Number is required",
                              pattern: {
                                value: /^[0-9]{9,18}$/,
                                message: "Invalid Account Number",
                              },
                            })}
                            className="form-control"
                          />
                          {errors.accountNumber && (
                            <p className="error-message">{errors.accountNumber.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Aadhar Number</label>
                          <input
                            type="text"
                            name="aadhar_number"
                            {...register("aadhar_number", {
                              required: "Aadhar Number is required",
                              pattern: {
                                value: /^[0-9]{12}$/,
                                message: "Invalid Aadhar Number",
                              },
                            })}
                            className="form-control"
                          />
                          {errors.aadhar_number && (
                            <p className="error-message">{errors.aadhar_number.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end row */}
        </div>{" "}
        {/* end container */}
      </section>
    </>
  );
}

export default ProfilePage;
