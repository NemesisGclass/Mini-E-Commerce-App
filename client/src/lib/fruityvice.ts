// Fruityvice API service
const FRUITYVICE_BASE_URL = 'https://www.fruityvice.com/api';

export interface FruitNutrition {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

export interface FruityviceResponse {
  success: boolean;
  data?: FruitNutrition;
  error?: string;
}

class FruityviceService {
  async getFruitByName(name: string): Promise<FruityviceResponse> {
    try {
      const response = await fetch(`${FRUITYVICE_BASE_URL}/fruit/${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch fruit data: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async getFruitById(id: number): Promise<FruityviceResponse> {
    try {
      const response = await fetch(`${FRUITYVICE_BASE_URL}/fruit/${id}`);
      
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch fruit data: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async getAllFruits(): Promise<FruityviceResponse> {
    try {
      const response = await fetch(`${FRUITYVICE_BASE_URL}/fruit/all`);
      
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch fruits: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export const fruityviceService = new FruityviceService();
