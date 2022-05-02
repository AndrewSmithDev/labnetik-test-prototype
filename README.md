# Ultimate Feature Description

## Purpose

Provide a way for organizations or labs to customize their tests to better match their custom workflows.

## Overview

An admin on the Labnetic platform must be able to ‘assign’ or ‘choose’ a test type that they would wish to have attached to one of their labs. 

These test will have a reference to the original test (known as the **complete base test**). The original test would have the essential fields and inputs that are required to perform the test (known as the **test kernel**). In addition, the test will have additional fields and inputs that are not required but provided for ease of use (known as **stock fields**). 

The admin would be able enable/disable any of the stock fields. In addition, an admin would be able to define additional fields and inputs to the test to better fit to their workflows.

A test would belong to the Organization -> Lab.

## Parts Breakdown

Our original copy of any test will comprise of a few parts;

1. The Complete Base Test

    - This is the entire test containing all fields that were pulled from the original copy created and only altered by the Labnetic development team

2. The Test kernel 

    - The kernel is the CRITICAL fields that cannot be altered or edited due to the need for them to conduct the core calculations or functions of the test

3. The  Stock Fields

    - The fields that come in The Complete Base Test that can be optionally hidden due to them not being required for the functionality, however, are most often paired with the test for ease of use and similarities.

### The custom test will comprise of the following parts

1. The Custom Fields

    - additional fields that an end-user or the Labnetic development team, during a company onboarding, decides to add on The Complete Base Test for their own workflows or processes

# Phases

## Phase 1

In this phase we will allow adding custom text (string) fields to the compressive strength tests. During this phase we will not be concerned with the complete base tests (and by extention we will not be concerned with the test kernal or stock fields), instead the CS test will be used in its place.

In this phase we will allow custom string/text fields to be added to a custom test configuration. Those custom fields will then be appended to the CS form and stored in the DB. 

**TLDR**: This phase will allow a custom test configuration to be added to the CS test module. 

### Features

- Custom string/text fields added 
- Base test configuration
- Base form generator
- Base dto/zod schema generator
- Base report generator
- Storage of custom field values in the DB

### Proposal

#### Custom Test Configuration

#### Base form generator

A component that accepts a custom test configuration and generators a form. The form should be validated using the zod schema described below

#### Base dto/zod schema generator

A function that accepts a test configuration and generates a zod schema

#### Base report generator

The custom fields will be appended to the report

#### Storage of a custom field values in DB

The custom fields should be validated in the mongoose pre `validate` hook using the zod schema described above. The values should then be stored as key value pairs 

## Phase 2

A fully featured test configuration, as well as the ability to add test configurations to every test.

## Phase 3

A GUI for editing test configurations

## Phase 4

A market place
