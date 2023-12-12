import { Product } from '../../entities/product';
import { ApiRepoProducts } from '../../repo/api.repo.products';
import { store } from '../../store/store';
import {
  addNewProductThunk,
  deleteProductThunk,
  loadOneProductThunk,
  loadProductsThunk,
  updateCurrentProductThunk,
} from './products.thunk';

describe('Given loadProductsThunk', () => {
  describe('When we dispatch succesfully', () => {
    const mockedRepo = {
      getAllProducts: jest.fn().mockReturnValue([] as Product[]),
      getProductById: jest.fn().mockReturnValue({} as Product),
      deleteProduct: jest.fn().mockReturnValue([] as Product[]),
      createProduct: jest.fn().mockReturnValue({} as Product),
      updateProduct: jest.fn().mockReturnValue({} as Product),
    } as unknown as ApiRepoProducts;

    test('Then it should dispatch', async () => {
      await store.dispatch(loadProductsThunk(mockedRepo));
      expect(mockedRepo.getAllProducts).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await store.dispatch(loadOneProductThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.getProductById).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await store.dispatch(deleteProductThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.deleteProduct).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await store.dispatch(
        addNewProductThunk({ repo: mockedRepo, productToAdd: {} as FormData })
      );
      expect(mockedRepo.createProduct).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await store.dispatch(
        updateCurrentProductThunk({
          repo: mockedRepo,
          id: '',
          productToUpdate: {} as FormData,
        })
      );
      expect(mockedRepo.updateProduct).toHaveBeenCalled();
    });
  });

  describe('When we dispatch unsuccesfully', () => {
    const mockedRepo = {
      getAllProducts: jest.fn().mockRejectedValue([] as Product[]),
      getProductById: jest.fn().mockRejectedValue({} as Product),
    } as unknown as ApiRepoProducts;

    test('Then it should dispatch', async () => {
      await store.dispatch(loadProductsThunk(mockedRepo));
      expect(mockedRepo.getAllProducts).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await store.dispatch(loadOneProductThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.getProductById).toHaveBeenCalled();
    });
  });
});
