import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import Card from "../ReusableComponent/Card/index.tsx";
import Button from "../ReusableComponent/Button/index.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../ReusableComponent/Modal/index.tsx";
import Pagination from "../ReusableComponent/Pagination/index.tsx";
import { deleteUserApi, getUserApi } from "../../API/User/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slice/userSlice.tsx";
import { RootState } from "../../Redux/Store/index.tsx";
import Search from "../ReusableComponent/Search/index.tsx";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.user);

  const [showConfirm, setShowConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState();

  const handleGetData = async (pageNumber) => {
    const response = await getUserApi(id, { page: pageNumber, search: "" });

    if (response?.data?.message?.userData) {
      setData(response?.data?.message?.userData);
      setUserCount(response?.data?.message?.userCount);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    handleGetData(page);
  }, []);

  const buttonStyle = { width: "10%", height: "10%" };

  const cardStyle = useMemo(() => {
    return {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      padding: "20px",
    };
  }, []);

  const handleView = (item) => {
    dispatch(setUser(item));
    navigate(`/profile/${item.id}`);
  };

  const handleDelete = (deleteID) => {
    setDeleteId(deleteID);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteUserApi(deleteId);
    handleGetData(1);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handlePrevious = () => {
    if (page > 1) {
      handleGetData(page - 1);
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < Math.ceil(userCount / 4)) {
      handleGetData(page + 1);
      setPage(page + 1);
    }
  };

  const handleSearch = async (searchValue) => {
    const response = await getUserApi(id, { page, search: searchValue });

    if (response?.data?.message?.userData) {
      setData(response?.data?.message?.userData);
      setUserCount(response?.data?.message?.userCount);
    } else {
      setData([]);
    }
  };
  return (
    <div className="usersContainer">
      <Search
        placeholder={"Email / Username"}
        onClick={(value) => handleSearch(value)}
      />
      <div className="usersListContainer">
        {data.map((item: any) => (
          <Card key={item.id} style={cardStyle}>
            <div className="listContainer">
              <div className="fields">
                <p className="col">User Name</p>
                <p className="row">{item.username}</p>
              </div>
              <div className="fields">
                <p className="col">Full Name</p>
                <p className="row">{item.firstName + " " + item.lastName}</p>
              </div>
              <div className="fields">
                <p className="col">Email</p>
                <p className="row">{item.email}</p>
              </div>
              <div className="fields">
                <p className="col">Role</p>
                <p className="row">{item.role}</p>
              </div>
              <div className="fields">
                <p className="col">Status</p>
                <p
                  className="row"
                  style={{
                    color: item.status === "ACTIVE" ? "green" : "red",
                    fontWeight: 500,
                  }}
                >
                  {item.status}
                </p>
              </div>
              <Button
                onClick={() => handleView(item)}
                type="button"
                text="View"
                style={buttonStyle}
              />
              {user.role === "SUPER_ADMIN" && (
                <Button
                  onClick={() => handleDelete(item.id)}
                  type="button"
                  text="Delete"
                  style={buttonStyle}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="paginationContainer">
        <Pagination
          onPrevues={() => handlePrevious()}
          onNext={() => handleNext()}
          disabledNext={page >= Math.ceil(userCount / 4)}
          disabledPrevious={page <= 1}
          text={page}
        />
      </div>

      {showConfirm && (
        <Modal
          text={"Are you sure you want to delete?"}
          confirm={confirmDelete}
          cancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Users;
