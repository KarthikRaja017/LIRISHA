# Standard API Response Format

All responses maintain strict schema uniformity.

## Success Response (200 OK / 201 Created)

```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {
    "id": 1,
    "name": "Sample Item"
  }
}
```

## Paginated Success Response

```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": {
    "items": [
      { "id": 1, "name": "Item 1" }
    ],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

## Error Response (400 / 401 / 404 / 422 / 500)

```json
{
  "success": false,
  "message": "Input validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "value is not a valid email address"
    }
  }
}
```
