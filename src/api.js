import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:3001";

function addDay(date) {
  const copy = new Date(date);
  copy.setDate(date.getDate() + 1);
  return copy;
}

export const fetchBookedDates = async (token) => {
  const response = await fetch(`${API_URL}/stay`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  let dates = [];

  json.forEach(({ startDate, endDate }) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    while (startDate <= endDate) {
      const date = new Date(startDate);
      dates.push(date);
      startDate = addDay(date);
    }
  });

  return dates;
};

export const submitDates = async ({ startDate, endDate }, token) => {
  const decoded = jwtDecode(token);
  await fetch(`${API_URL}/stay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: decoded.sub,
      startDate,
      endDate,
    }),
  });
};

export const getUsersStays = async () => {
  //await fetch(API_URL);
  return [];
};

export const editStay = async () => {
  //await fetch(API_URL);
  return [];
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    return json.access_token;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async ({
  email,
  password,
  phoneNumber,
  firstName,
  lastName,
}) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      }),
    });

    await response.json();
  } catch (error) {
    console.log(error);
  }
};
