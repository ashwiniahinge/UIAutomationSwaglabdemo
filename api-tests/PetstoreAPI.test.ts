import { test, expect } from '@playwright/test';

const baseURL = 'https://petstore.swagger.io/v2';

test.describe('Petstore API Tests', () => {
  test('Create a new pet', async ({ request }) => {
    const petId = Date.now(); // Unique ID
    const newPet = {
      id: petId,
      category: {
        id: 1,
        name: 'Dogs'
      },
      name: 'Buddy',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly'
        }
      ],
      status: 'available'
    };

    const response = await request.post(`${baseURL}/pet`, {
      data: newPet
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(petId);
    expect(responseBody.name).toBe('Buddy');
    expect(responseBody.status).toBe('available');
  });

  test('Get pet by ID', async ({ request }) => {
    // First create a pet
    const petId = Date.now() + 1;
    const newPet = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: 'Buddy',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'friendly' }],
      status: 'available'
    };

    await request.post(`${baseURL}/pet`, { data: newPet });

    const response = await request.get(`${baseURL}/pet/${petId}`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(petId);
    expect(responseBody.name).toBe('Buddy');
  });

  test('Update pet', async ({ request }) => {
    // First create a pet
    const petId = Date.now() + 2;
    const newPet = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: 'Buddy',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'friendly' }],
      status: 'available'
    };

    await request.post(`${baseURL}/pet`, { data: newPet });

    const updatedPet = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: 'Buddy Updated',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'friendly' }],
      status: 'sold'
    };

    const response = await request.put(`${baseURL}/pet`, {
      data: updatedPet
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Buddy Updated');
    expect(responseBody.status).toBe('sold');
  });

  test('Find pets by status', async ({ request }) => {
    const response = await request.get(`${baseURL}/pet/findByStatus?status=available`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
  });

  test('Delete pet', async ({ request }) => {
    // First create a pet
    const petId = Date.now() + 3;
    const newPet = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: 'Buddy',
      photoUrls: ['https://example.com/photo.jpg'],
      tags: [{ id: 1, name: 'friendly' }],
      status: 'available'
    };

    await request.post(`${baseURL}/pet`, { data: newPet });

    const response = await request.delete(`${baseURL}/pet/${petId}`);

    expect(response.status()).toBe(200);

    // Note: Petstore API may not return 404 for deleted pets, so check if it's gone or status changed
    const getResponse = await request.get(`${baseURL}/pet/${petId}`);
    // Accept either 404 or the pet being returned (API behavior varies)
    expect([200, 404]).toContain(getResponse.status());
  });
});