/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TerrainComponent } from './terrain.component';
import {CalcService} from "../../calc-service";
import {QueryParamsHelperService} from "../../query-params-helper.service";
import {Ng2BootstrapModule, PopoverDirective} from "ng2-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";

describe('TerrainComponent', () => {
  let component: TerrainComponent;
  let fixture: ComponentFixture<TerrainComponent>;
  let queryParamsHelperService:QueryParamsHelperService;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        Ng2BootstrapModule.forRoot()
      ],
      declarations:[TerrainComponent],
      providers:[QueryParamsHelperService, CalcService]
    })
    .compileComponents();
  }));

  beforeEach(inject([QueryParamsHelperService],(_queryParamsHelperService:QueryParamsHelperService)=> {
    fixture = TestBed.createComponent(TerrainComponent);
    component = fixture.componentInstance;
    queryParamsHelperService = _queryParamsHelperService;
    element   = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should create TerrainComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should test onShownPopover', () => {
    let fake_input = {focus(){}};
    // let btn = element.querySelector("button");
    // btn.click();
    // let input = element.querySelector("input");
    spyOn(document,'querySelector').and.returnValue(fake_input);
    spyOn(fake_input,'focus');
    component.onShownPopover();
    expect(fake_input.focus).toHaveBeenCalled();
  });

  it('should test submitTerrain', () => {
    component.terrainUrl = "fake";
    let popDirective:PopoverDirective = <any>{hide(){}};
    spyOn(component.terrainChange,'emit');
    spyOn(component.submitTerrainEmitter,'emit');
    spyOn(popDirective,'hide');
    component.submitTerrain(popDirective);
    expect(component.terrainChange.emit).toHaveBeenCalledWith("fake");
    expect(component.submitTerrainEmitter.emit).toHaveBeenCalled();
    expect(popDirective.hide).toHaveBeenCalled();

  });
  it('should test setTerrain', () => {
    spyOn(queryParamsHelperService,'queryTerrain');
    component.setTerrain();
    expect(queryParamsHelperService.queryTerrain).toHaveBeenCalled();
  });


});
