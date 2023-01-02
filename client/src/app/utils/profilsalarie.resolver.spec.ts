import { TestBed } from '@angular/core/testing';

import { ProfilsalarieResolver } from './profilsalarie.resolver';

describe('ProfilsalarieResolver', () => {
  let resolver: ProfilsalarieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfilsalarieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
