# Real Estate API Documentation

Backend API for the Django + Django REST Framework real-estate project.

## Base URL

When running locally:

```text
http://127.0.0.1:8000
```

All endpoints below are relative to the base URL.

---

## Authentication

Protected endpoints use JWT authentication.

Send the access token in the request header:

```http
Authorization: Bearer <access_token>
```

The login endpoint returns an access token and refresh token. Use the refresh token with `/users/token/refresh/` when a new access token is needed.

---

# Users & Authentication

## Register

### `POST /users/register`

Creates a new user. A newly registered user is created as a client.

### Request body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

### Success

**201 Created**

The response contains the serialized user data returned by the registration serializer.

### Common errors

**400 Bad Request** — invalid username, email, or password.

---

## Login

### `POST /users/login/`

Authenticates a user and returns JWT tokens. The response also contains the user's type (`seller`, `client`, or `null`).

### Request body

```json
{
  "username": "john",
  "password": "StrongPassword123!"
}
```

### Success

**200 OK**

Example response shape:

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>",
  "user_type": "client"
}
```

---

## Refresh Access Token

### `POST /users/token/refresh/`

Creates a new access token using a refresh token.

### Request body

```json
{
  "refresh": "<refresh_token>"
}
```

### Success

**200 OK**

---

## Logout

### `POST /users/logout/`

Requires authentication. Blacklists the supplied refresh token.

### Request body

```json
{
  "refresh": "<refresh_token>"
}
```

### Success

**200 OK**

```json
{
  "message": "Logged out successfully"
}
```

### Common errors

**400 Bad Request** — invalid refresh token or missing refresh token.

---

## Current User

### `GET /users/whoami/`

Requires authentication.

Returns the authenticated user's seller or client profile.

### Success

**200 OK**

The response depends on the user's current profile type.

### Errors

**404 Not Found** — the authenticated user does not have a seller or client profile.

---

# Seller

## Create / Update Seller Profile

### `PATCH /users/create/seller`

Requires authentication.

A newly registered user starts as a client. Calling this endpoint makes the authenticated user a seller. When the seller profile is first created, the existing client profile is removed.

Calling the endpoint again updates the existing seller profile.

### Example request body

```json
{
  "number": "+989121234567",
  "bio": "Real estate consultant in Tehran"
}
```

Image uploads can also be sent using `multipart/form-data`.

### Important behavior

The user is determined from the JWT token. The client cannot choose another user as the seller.

### Success

**200 OK**

Returns the seller profile.

### Common errors

**400 Bad Request** — invalid profile data.

---

## Get Seller Information

### `GET /users/seller/info/<seller_id>`

Public endpoint. Returns public information about a seller and their properties.

### Example

```text
GET /users/seller/info/3
```

### Success

**200 OK**

### Errors

**404 Not Found** — seller does not exist.

---

# Favorites

## Get My Favorites

### `GET /users/favorites/`

Requires authentication and a client profile.

Returns the authenticated client's favorite properties.

### Success

**200 OK**

---

## Add a Favorite

### `POST /users/favorites/`

Requires authentication and a client profile.

### Request body

```json
{
  "property": 5
}
```

The client is determined from the authenticated user and cannot be supplied by the client in the request body.

### Success

**201 Created**

### Common errors

**400 Bad Request** — the property is already in the client's favorites or the request data is invalid.

**403 Forbidden** — authenticated user is not a client.

---

## Remove a Favorite

### `DELETE /users/favorites/`

Requires authentication and a client profile.

### Request body

```json
{
  "property": 5
}
```

### Success

**204 No Content**

### Common errors

**404 Not Found** — the property is not in the client's favorites.

**403 Forbidden** — authenticated user is not a client.

---

# Notifications

## Get Notifications

### `GET /users/notifications/`

Requires authentication.

Returns notifications belonging to the authenticated user.

### Success

**200 OK**

---

## Update a Notification

### `PATCH /users/notifications/?id=<notification_id>`

Requires authentication.

The notification must belong to the authenticated user.

### Example

```text
PATCH /users/notifications/?id=10
```

### Example request body

```json
{
  "is_read": true
}
```

### Success

**200 OK**

### Errors

**404 Not Found** — notification does not exist or does not belong to the authenticated user.

---

# Properties

## List Properties

### `GET /properties/`

Public endpoint.

Returns a list of properties. The endpoint supports filtering, sorting, and Redis caching.

### Filter parameters

| Parameter | Description |
|---|---|
| `category` | Filter by property category, such as `apartment`, `house`, `villa`, `office`, or `land` |
| `city` | Filter by city ID |
| `has_parking` | Filter by parking availability |
| `room_numbers` | Filter by number of rooms |
| `building_age` | Filter by building age |
| `rating` | Filter by ratings within ±0.5 of the supplied value |

### Sorting

Use the `order` query parameter.

| Value | Result |
|---|---|
| `rating` | Highest-rated first |
| `rating_low` | Lowest-rated first |
| `newest` | Lower building age first |
| `oldest` | Higher building age first |
| `size` | Smallest size first |
| `size_large` | Largest size first |

### Example

```text
GET /properties/?city=1&category=apartment&order=rating
```

### Success

**200 OK**

---

## Create Property

### `POST /properties/create/property`

Requires authentication and a seller profile.

### Request body

```json
{
  "title": "Modern Apartment",
  "category": "apartment",
  "description": "A modern two-bedroom apartment.",
  "address": "Tehran, Iran",
  "size": 120,
  "building_age": 3,
  "room_numbers": 2,
  "has_parking": true,
  "city": 1
}
```

`main_image` can be sent as a file using `multipart/form-data`.

### Important behavior

The seller is determined from the authenticated user. The client cannot select the seller in the request body.

The following property fields are generated or controlled by the server:

```text
seller
rating
rating_times
created_at
```

### Success

**201 Created**

### Common errors

**400 Bad Request** — invalid property data.

**403 Forbidden** — authenticated user is not a seller.

---

## Add Property Image

### `POST /properties/add/images/<property_id>`

Requires authentication.

Only the seller who owns the property can add images to it.

### Request

Use `multipart/form-data` with an image file.

Example field:

```text
image: <image file>
```

### Success

**201 Created**

### Common errors

**403 Forbidden** — authenticated user does not own the property.

**404 Not Found** — property does not exist.

**400 Bad Request** — invalid image data.

---

## Get Property Details

### `GET /properties/detail/<property_id>`

Public endpoint.

Returns detailed information about a property, including its seller and property images.

### Example

```text
GET /properties/detail/5
```

### Success

**200 OK**

### Errors

**404 Not Found** — property does not exist.

---

## Delete Property

### `DELETE /properties/delete/<property_id>`

Requires authentication.

Only the seller who owns the property can delete it.

### Success

**204 No Content**

### Common errors

**403 Forbidden** — authenticated user does not own the property.

**404 Not Found** — property does not exist.

---

## Rate a Property

### `POST /properties/rate/<property_id>/<rate>`

Requires authentication.

The rating must be an integer from 1 to 5.

### Example

```text
POST /properties/rate/5/4
```

This gives property `5` a rating of `4/5`.

### Success

**200 OK**

Example response shape:

```json
{
  "rating": 4,
  "rating_times": 1
}
```

The endpoint updates the property's average rating and rating count.

A notification is created for the seller, and a notification email is queued as a background Celery task.

### Errors

**400 Bad Request** — rating is outside the range 1–5.

**404 Not Found** — property does not exist.

---

# HTTP Status Codes Used

| Status | Meaning in this API |
|---|---|
| `200 OK` | Successful GET, PATCH, or other operation returning a response body |
| `201 Created` | New resource successfully created |
| `204 No Content` | Successful deletion with no response body |
| `400 Bad Request` | Invalid input or business-rule violation |
| `401 Unauthorized` | Authentication is required or the JWT credentials are invalid |
| `403 Forbidden` | User is authenticated but does not have permission |
| `404 Not Found` | Requested resource does not exist or is not accessible to the current user |

---

# Main Technologies

- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- Redis
- Celery

