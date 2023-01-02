import { TestBed } from '@angular/core/testing';

import { ProfilentrepriseResolver } from './profilentreprise.resolver';

describe('ProfilentrepriseResolver', () => {
  let resolver: ProfilentrepriseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfilentrepriseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
